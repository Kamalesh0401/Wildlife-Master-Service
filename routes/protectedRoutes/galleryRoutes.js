const express = require('express');
const router = express.Router();
const galleryController = require('../../controller/galleryController');

// Routes for gallery operations
router.get('/', galleryController.getAllGalleries);
router.get('/:id', galleryController.getGalleryById);
router.post('/', galleryController.addGallery);
router.put('/:id', galleryController.updateGallery);

module.exports = router;