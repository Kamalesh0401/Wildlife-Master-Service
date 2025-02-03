const express = require('express');
const router = express.Router();
const fileController = require('../../controller/fileController');

router.get('/:file_dir', fileController.getFilesByDirectory);
router.get('/upload', fileController.addNewFile);


module.exports = router;