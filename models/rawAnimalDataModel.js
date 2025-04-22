const mongoose = require('mongoose');

const rawAnimalDataSchema = new mongoose.Schema(
    {
        queryName: { type: String, required: true }, // Tracks the input animal name
    },
    { strict: false } // Allows flexible fields from API response
);

module.exports = mongoose.model('RawAnimalData', rawAnimalDataSchema);