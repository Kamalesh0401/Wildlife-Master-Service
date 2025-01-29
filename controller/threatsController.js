const express = require("express");
const router = express.Router();

const ThreatsData = require("../models/threatsData");

const threatController = {
    getAllThreats: async (req, res) => {
        try {
            const data = await ThreatsData.find();
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

module.exports = threatController;
