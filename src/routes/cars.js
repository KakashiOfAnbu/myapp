const express = require('express');
const router = express.Router();
const carsController = require('../app/controllers/CarsController');

router.get('/add', carsController.add);
router.post('/store', carsController.store);
router.get('/:slug', carsController.show);
router.get('/', carsController.index);

module.exports = router;
