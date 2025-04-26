const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    image: {
        type: String, // URL or path to the image
        required: [true, 'Image URL is required'],
        trim: true,
    },
    caption: {
        type: String,
        required: [true, 'Caption is required'],
        trim: true,
        maxlength: [200, 'Caption must be less than 200 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster searches by image or caption
gallerySchema.index({ image: 1 });
gallerySchema.index({ caption: 'text' });

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;