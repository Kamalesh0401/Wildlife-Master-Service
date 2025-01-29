const mongoose = require('mongoose');

const ThreatsDataSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the threat (e.g., Habitat Loss, Climate Change)
    description: { type: String, required: true }, // Detailed description of the threat
    speciesAffected: { type: [String], required: false }, // List of species affected by this threat
    causes: { type: String, required: true }, // Primary causes of the threat (e.g., deforestation, pollution)
    impactLevel: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], required: true }, // Severity of the threat
    mitigationStrategies: { type: [String], required: false }, // Efforts to reduce or eliminate the threat
    geographicRegions: { type: [String], required: false }, // Regions where this threat is prominent
    reportedCases: { type: Number, required: false }, // Optional number of reported cases
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Files", required: false }, // Optional image URL related to the threat
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Files", required: false }, // Optional video URL related to the threat
    lastUpdated: { type: Date, default: Date.now },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    modifiedOn: { type: Date, default: Date.now, required: true } // Timestamp for when the record was last updated
});

module.exports = mongoose.model('ThreatsData ', ThreatsDataSchema);
