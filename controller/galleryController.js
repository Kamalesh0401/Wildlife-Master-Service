const Gallery = require('../models/galleryModel');
const createError = require('http-errors');

// Get all galleries
exports.getAllGalleries = async (req, res, next) => {
    try {
        const galleries = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: { galleries },
            count: galleries.length,
        });
    } catch (error) {
        next(createError(500, 'Failed to fetch galleries'));
    }
};

// Get gallery by ID
exports.getGalleryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw createError(400, 'Invalid gallery ID');
        }
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            throw createError(404, 'Gallery not found');
        }
        res.status(200).json({
            success: true,
            data: { gallery },
        });
    } catch (error) {
        next(error);
    }
};

// Add a new gallery
exports.addGallery = async (req, res, next) => {
    try {
        const { image, caption } = req.body;
        if (!image || !caption) {
            throw createError(400, 'Image URL and caption are required');
        }
        const gallery = new Gallery({ image, caption });
        const savedGallery = await gallery.save();
        res.status(201).json({
            success: true,
            data: { gallery: savedGallery },
            message: 'Gallery created successfully',
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            next(createError(400, messages.join(', ')));
        } else {
            next(createError(500, 'Failed to create gallery'));
        }
    }
};

// Update a gallery by ID
exports.updateGallery = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw createError(400, 'Invalid gallery ID');
        }
        if (Object.keys(updates).length === 0) {
            throw createError(400, 'No update data provided');
        }
        const allowedUpdates = ['image', 'caption'];
        const isValidUpdate = Object.keys(updates).every((key) => allowedUpdates.includes(key));
        if (!isValidUpdate) {
            throw createError(400, 'Invalid update fields');
        }
        const gallery = await Gallery.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!gallery) {
            throw createError(404, 'Gallery not found');
        }
        res.status(200).json({
            success: true,
            data: { gallery },
            message: 'Gallery updated successfully',
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            next(createError(400, messages.join(', ')));
        } else {
            next(error);
        }
    }
};