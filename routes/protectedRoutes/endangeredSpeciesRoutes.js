const express = require('express');
const router = express.Router();
const endangeredSpeciesController = require('../../controller/endangeredSpeciesController');

router.get('/', endangeredSpeciesController.getAllEndangeredSpecies);
router.get('/:id', endangeredSpeciesController.getSelectedEndangeredSpecies);


module.exports = router;
