const express = require('express');
const forestController = require("../../controller/forestController");

const router = express.Router();

// Routes
router.get('/', forestController.getAllForests); // Get all forests
router.get('/:id', forestController.getForestById); // Get a single forest by ID
router.post('/', forestController.addForest); // Add a new forest (Admin only)
router.put('/:id', forestController.updateForest); 

module.exports = router;