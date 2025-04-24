const blogRoutes = require("./blogRoutes");
const speciesProfileRoutes = require("./speciesProfileRoutes");
const threatsRoutes = require("./threatsRoutes");
const endangeredSpeciesRoutes = require("./endangeredSpeciesRoutes");
const filesRoutes = require("./filesRoutes");
const animalRoutes = require('./animalRoutes');
const forestRoutes = require('./forestRoutes');
const protect = require("../../middleware/authMiddleware");

const express = require("express");
const router = express.Router();


router.use("/species", protect, speciesProfileRoutes);
router.use("/blogs", protect, blogRoutes);
router.use("/threats", protect, threatsRoutes);
router.use("/endangered", protect, endangeredSpeciesRoutes);
router.use("/files", protect, filesRoutes);
router.use("/data", protect, animalRoutes);
router.use('/forests', forestRoutes);




module.exports = router;