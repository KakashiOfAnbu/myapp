const express = require('express');
const router = express.Router();
const MeController = require('../app/controllers/MeController');

router.get('/stored/cars', MeController.storeCars);
router.get('/trash/cars', MeController.trashView);

module.exports = router;
