const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Park name is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Park name must be less than 100 characters'],
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
    majorAnimals: [{
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
    additionalInfo: {
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Index for faster searches by name and gallery
parkSchema.index({ name: 1 });
parkSchema.index({ gallery: 1 });

const Park = mongoose.model('Park', parkSchema);

module.exports = Park;