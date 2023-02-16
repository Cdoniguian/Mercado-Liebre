// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainControllers');

router.get('/', mainController.index); 


module.exports = router;
