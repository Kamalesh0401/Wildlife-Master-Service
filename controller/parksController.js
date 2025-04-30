const mongoose = require('mongoose');
const Park = require('../models/parksModel');
const Animal = require('../models/animalDataModel'); // Import Animal model for validation
const Gallery = require('../models/galleryModel');

// Get all parks
exports.getAllParks = async (req, res) => {
    try {
        const parks = await Park.find().populate({
            path: 'majorAnimals',
            select: 'name scientificName habitat conservationStatus image',
        });
        res.status(200).json({
            status: 'success',
            results: parks.length,
            data: { parks },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch parks',
            error: error.message,
        });
    }
};

// Get a single park by ID
exports.getParkById = async (req, res) => {
    try {
        const park = await Park.findById(req.params.id).populate({
            path: 'majorAnimals',
            select: 'name scientificName habitat conservationStatus image',
        });
        if (!park) {
            return res.status(404).json({
                status: 'fail',
                message: 'Park not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: { park },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch park',
            error: error.message,
        });
    }
};

exports.addPark = async (req, res) => {
    try {
        let parksToInsert = [];
        let validationErrors = [];

        if (Array.isArray(req.body)) {
            for (const element of req.body) {
                const { name, description, overview, majorAnimals, additionalInfo, image, gallery, location } = element;

                if (!name || !description || !overview) {
                    validationErrors.push({
                        name: element.name || 'Unnamed Park',
                        message: 'Missing required fields: name, description, and overview are required',
                    });
                    continue;
                }

                // Validate majorAnimals IDs
                if (majorAnimals && Array.isArray(majorAnimals)) {
                    for (const animalId of majorAnimals) {
                        if (!mongoose.isValidObjectId(animalId)) {
                            validationErrors.push({
                                name: element.name || 'Unnamed Park',
                                message: `Invalid animal ID format: ${animalId} is not a valid ObjectId`,
                            });
                            continue;
                        }
                        const animal = await Animal.findById(animalId);
                        if (!animal) {
                            validationErrors.push({
                                name: element.name || 'Unnamed Park',
                                message: `Invalid animal ID: ${animalId} does not exist`,
                            });
                        }
                    }
                }

                if (validationErrors.length === 0) {
                    parksToInsert.push({
                        name,
                        description,
                        overview,
                        majorAnimals: majorAnimals || [],
                        additionalInfo,
                        image,
                        gallery: gallery || [],
                        location
                    });
                }
            }

            if (validationErrors.length > 0) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Validation failed for one or more parks',
                    errors: validationErrors,
                });
            }

            if (parksToInsert.length > 0) {
                const insertedParks = await Park.insertMany(parksToInsert);
                const populatedParks = await Park.find({ _id: { $in: insertedParks.map(p => p._id) } }).populate({
                    path: 'majorAnimals',
                    select: 'name scientificName habitat conservationStatus image',
                });
                return res.status(201).json({
                    status: 'success',
                    data: { parks: populatedParks },
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'No valid parks to add',
                    data: [],
                });
            }
        } else if (typeof req.body === 'object') {
            const { name, description, overview, majorAnimals, additionalInfo, image, location, gallery } = req.body;

            if (!name || !description || !overview) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Missing required fields: name, description, and overview are required',
                });
            }

            // Validate majorAnimals IDs
            if (majorAnimals && Array.isArray(majorAnimals)) {
                for (const animalId of majorAnimals) {
                    if (!mongoose.isValidObjectId(animalId)) {
                        return res.status(400).json({
                            status: 'fail',
                            message: `Invalid animal ID format: ${animalId} is not a valid ObjectId`,
                        });
                    }
                    const animal = await Animal.findById(animalId);
                    if (!animal) {
                        return res.status(400).json({
                            status: 'fail',
                            message: `Invalid animal ID: ${animalId} does not exist`,
                        });
                    }
                }
            }

            const newPark = new Park({
                name,
                description,
                overview,
                majorAnimals: majorAnimals || [],
                additionalInfo,
                image,
                gallery: gallery || [],
                location
            });

            const savedPark = await newPark.save();
            const populatedPark = await Park.findById(savedPark._id).populate({
                path: 'majorAnimals',
                select: 'name scientificName habitat conservationStatus image',
            });
            return res.status(201).json({
                status: 'success',
                data: { park: populatedPark },
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid request body. Expected a single park object or an array of park objects.',
            });
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'Park name already exists',
            });
        }
        res.status(500).json({
            status: 'error',
            message: 'Failed to add park(s)',
            error: error.message,
        });
    }
};
exports.updatePark = async (req, res) => {
    try {
        const park = await Park.findById(req.params.id);
        if (!park) {
            return res.status(404).json({
                status: 'fail',
                message: 'Park not found',
            });
        }

        // Validate majorAnimals if provided
        if (req.body.majorAnimals && Array.isArray(req.body.majorAnimals)) {
            for (const animalId of req.body.majorAnimals) {
                const animal = await Animal.findById(animalId);
                if (!animal) {
                    return res.status(400).json({
                        status: 'fail',
                        message: `Invalid animal ID: ${animalId} does not exist`,
                    });
                }
            }
        }

        const updatedData = {
            name: req.body.name || park.name,
            description: req.body.description || park.description,
            overview: req.body.overview || park.overview,
            majorAnimals: req.body.majorAnimals || park.majorAnimals,
            additionalInfo: req.body.additionalInfo || park.additionalInfo,
            image: req.body.image || park.image,
            gallery: req.body.gallery || park.gallery,
            location: req.body.location || park.location,
        };

        const updatedPark = await Park.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        ).populate({
            path: 'majorAnimals',
            select: 'name scientificName habitat conservationStatus image',
        });

        res.status(200).json({
            status: 'success',
            data: { park: updatedPark },
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'Park name already exists',
            });
        }
        res.status(500).json({
            status: 'error',
            message: 'Failed to update park',
            error: error.message,
        });
    }
};
