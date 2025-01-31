const express = require('express');
const router = express.Router();
const speciesProfileController =require("../../controller/speciesProfileController.js");

router.get('/', speciesProfileController.getAllSpecies);
router.get('/:id', speciesProfileController.getSelectedSpecies);


module.exports = router;