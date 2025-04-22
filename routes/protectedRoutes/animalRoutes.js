const express = require('express');
const router = express.Router();
const animalController = require('../../controller/animalController');

// Route to trigger animal data download
router.post('/download', animalController.downloadAnimalData);

// Route to list stored animals (optional, for testing)
router.get('/', animalController.listAnimals);

module.exports = router;