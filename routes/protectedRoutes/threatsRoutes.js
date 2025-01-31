const express = require('express');
const router = express.Router();
const threatsController = require('../../controller/threatsController');

router.get('/', threatsController.getAllThreats);


module.exports = router;