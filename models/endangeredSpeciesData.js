const mongoose = require('mongoose');

const EndangeredSpeciesSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: "SpeciesProfileData" },
    endangeredStatus: {
        type: String,
        enum: ['Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened'],
        required: true
    },
    population: {
        current: { type: Number, required: true },
        trend: { type: String, enum: ['Increasing', 'Stable', 'Decreasing'], required: true }
    },
    primaryThreats: [{ type: String }],
    conservationEfforts: { type: String, required: false },
    redListCategory: { type: String, required: true },
    protectionMeasures: [{ type: String }],
    endangeredimage: { type: mongoose.Schema.Types.ObjectId, ref: "Files", required: false },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    modifiedOn: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('EndangeredSpecies', EndangeredSpeciesSchema);
