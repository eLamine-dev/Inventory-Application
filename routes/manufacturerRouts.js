const express = require('express');
const {
   getAllManufacturers,
   addManufacturer,
   confirmManufacturerDeletion,
   handleManufacturerDeletion,
} = require('../controllers/manufacturerController');

const router = express.Router();

router.get('/', getAllManufacturers);
router.post('/', addManufacturer);
router.get('/confirm-deletion/:id', confirmManufacturerDeletion);
router.post('/handle-deletion', handleManufacturerDeletion);

module.exports = router;
