const Forest = require('../models/forestModel');

// Get all forests
exports.getAllForests = async (req, res) => {
    try {
        const forests = await Forest.find().populate('gallery').populate('keySpecies');
        res.status(200).json({
            status: 'success',
            results: forests.length,
            data: { forests },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch forests',
            error: error.message,
        });
    }
};

// Get a single forest by ID
exports.getForestById = async (req, res) => {
    try {
        const forest = await Forest.findById(req.params.id).populate('gallery').populate('keySpecies');
        if (!forest) {
            return res.status(404).json({
                status: 'fail',
                message: 'Forest not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: { forest },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch forest',
            error: error.message,
        });
    }
};

// Add a new forest (Admin only)
exports.addForest = async (req, res) => {
    try {
        let forestsToInsert = [];
        let validationErrors = [];

        if (req.body && Array.isArray(req.body)) {
            for (const element of req.body) {
                const { name, description, overview, conservationStatus, image, gallery, keySpecies } = element;

                if (!name || !description || !overview || !conservationStatus) {
                    validationErrors.push({
                        name: element.name || 'Unnamed Forest', // Include name for better error context
                        message: 'Missing required fields: name, description, overview and conservationStatus are required',
                    });
                    continue; // Skip to the next forest if validation fails
                }

                // Check for duplicate name
                const existingForest = await Forest.findOne({ name });
                if (existingForest) {
                    validationErrors.push({
                        name: element.name,
                        message: `A forest with the name '${name}' already exists`,
                    });
                    continue; // Skip if duplicate name found
                }

                forestsToInsert.push({
                    name,
                    description,
                    overview,
                    conservationStatus,
                    image,
                    gallery: gallery || [],
                    keySpecies: keySpecies || [],
                });
            }

            if (validationErrors.length > 0) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Validation failed for one or more forests',
                    errors: validationErrors,
                });
            }

            if (forestsToInsert.length > 0) {
                const insertedForests = await Forest.insertMany(forestsToInsert);
                return res.status(201).json({
                    status: 'success',
                    data: { forests: insertedForests }, // Return the array of inserted forests
                });
            } else {
                return res.status(200).json({ // If the array was empty or all invalid
                    status: 'success',
                    message: 'No valid forests to add',
                    data: [],
                });
            }
        } else if (req.body && typeof req.body === 'object') {
            const { name, description, overview, conservationStatus, image, gallery, keySpecies } = req.body;

            if (!name || !description || !overview || !conservationStatus) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Missing required fields: name, description, overview and conservationStatus are required',
                });
            }

            // Check for duplicate name
            const existingForest = await Forest.findOne({ name });
            if (existingForest) {
                return res.status(400).json({
                    status: 'fail',
                    message: `A forest with the name '${name}' already exists`,
                });
            }

            const newForest = new Forest({
                name,
                description,
                overview,
                conservationStatus,
                image,
                gallery: gallery || [],
                keySpecies: keySpecies || [],
            });

            const savedForest = await newForest.save();
            return res.status(201).json({
                status: 'success',
                data: { forest: savedForest },
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid request body. Expected a single forest object or an array of forest objects.',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to add forest(s)',
            error: error.message,
        });
    }
};


// Update a forest by ID (Admin only)
exports.updateForest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, overview, conservationStatus, image, gallery, keySpecies } = req.body;

        // Fetch the existing forest
        const existingForest = await Forest.findById(id);
        if (!existingForest) {
            return res.status(404).json({
                status: 'fail',
                message: 'Forest not found',
            });
        }

        // Check for duplicate name (exclude the current forest)
        if (name && name !== existingForest.name) {
            const duplicate = await Forest.findOne({ name, _id: { $ne: id } });
            if (duplicate) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'A forest with this name already exists',
                });
            }
        }

        // Prepare updated data, using new value or fallback to existing
        const updatedData = {
            name: name ?? existingForest.name,
            description: description ?? existingForest.description,
            overview: overview ?? existingForest.overview,
            conservationStatus: conservationStatus ?? existingForest.conservationStatus,
            image: image ?? existingForest.image,
            gallery: gallery ?? existingForest.gallery,
            keySpecies: keySpecies ?? existingForest.keySpecies,
        };

        // Update the forest
        const updatedForest = await Forest.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            message: 'Forest updated successfully',
            data: { forest: updatedForest },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update forest',
            error: error.message,
        });
    }
};
