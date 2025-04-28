const express = require('express');
const router = express.Router();
const animalController = require('../../controller/animalController');

// Route to trigger animal data download
router.post('/download', animalController.downloadAnimalData);

// Route to list stored animals (optional, for testing)
router.get('/list', animalController.listAnimals);

router.post('/add', animalController.addAnimal);
router.get('/id/:id', animalController.getAnimalById); // Get animal by ID
router.get('/name/:name', animalController.getAnimalByName); // Get animal by name
router.put('/:id', animalController.updateAnimal); // Update animal by ID
router.delete('/:id', animalController.deleteAnimalById);
module.exports = router;