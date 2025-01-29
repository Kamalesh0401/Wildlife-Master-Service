const express = require("express");
const EndangeredSpecies = require("../models/endangeredSpeciesData"); // Assuming you have a mongoose model

let endangeredSpeciesController = {};

endangeredSpeciesController.getAllEndangeredSpecies = async (req, res) => {
    try {
        const data = await EndangeredSpecies.find();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get a specific endangeredspecies by ID
endangeredSpeciesController.getSelectedEndangeredSpecies = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await EndangeredSpecies.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Endangered Species not found" });
        }
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = endangeredSpeciesController;
