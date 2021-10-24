const express = require('express');
const router = express.Router();
const carsController = require('../app/controllers/CarsController');

router.get('/add', carsController.add);
router.post('/bulk-store', carsController.bulkStore);
router.post('/store', carsController.store);
router.post('/handle-form-actions', carsController.handleFormActions);
router.get('/:id/edit', carsController.edit);
router.put('/:id', carsController.update);
router.patch('/:id/restore', carsController.restore);
router.delete('/:id/permanent', carsController.deletePermanently);
router.delete('/:id', carsController.delete);
router.get('/:slug', carsController.show);
router.get('/', carsController.index);

module.exports = router;
