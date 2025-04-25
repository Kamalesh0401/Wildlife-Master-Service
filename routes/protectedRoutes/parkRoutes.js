const express = require('express');
const parksController = require("../../controller/parksController");

const router = express.Router();

// Routes
router.get('/', parksController.getAllParks); // Get all parks
router.get('/:id', parksController.getParkById); // Get a single park  by ID
router.post('/', parksController.addPark); // Add a new park (Admin only)
router.put('/:id', parksController.updatePark);

module.exports = router;