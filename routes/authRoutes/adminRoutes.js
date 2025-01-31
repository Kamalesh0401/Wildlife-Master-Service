const express = require('express');
const router = express.Router();
const adminController = require('../../controller/adminController');

router.post('/', adminController.login);

module.exports = router;