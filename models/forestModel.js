const mongoose = require('mongoose');

const forestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Forest name is required'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    overview: {
        type: String,
        required: [true, 'Overview is required'],
        trim: true,
    },
    conservationStatus: {
        type: String,
        required: [true, 'Conservation status is required'],
        trim: true,
    },
    image: {
        type: String, // URL or path to the main image
        trim: true,
    },
    gallery: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery',
        validate: {
            validator: async function (galleryId) {
                const gallery = await mongoose.model('Gallery').findById(galleryId);
                return !!gallery;
            },
            message: 'Invalid gallery ID: Gallery does not exist',
        },
    }],
    keySpecies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        validate: {
            validator: async function (animalId) {
                const animal = await mongoose.model('Animal').findById(animalId);
                return !!animal;
            },
            message: 'Invalid animal ID: Animal does not exist',
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster searches by name and gallery
forestSchema.index({ name: 1 });
forestSchema.index({ gallery: 1 });

const Forest = mongoose.model('Forest', forestSchema);

module.exports = Forest;