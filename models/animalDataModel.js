const mongoose = require('mongoose');

const animalDataSchema = new mongoose.Schema({
    id: String,
    name: String,
    scientificName: String,
    habitat: String,
    description: String,
    conservationStatus: String,
    populationTrend: String,
    geographicRange: [String],
    threats: [String],
    weight: String,
    lifespan: String,
    diet: String,
    foundIn: [String],
    topSpeed: String,
    height: String,
    commonName: String,
    type: String,
    image: String,
    queryName: String
});

module.exports = mongoose.model('Animal', animalDataSchema);