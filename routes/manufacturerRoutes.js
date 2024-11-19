const express = require('express');
const {
   getManufacturers,
   addManufacturer,
   confirmManufacturerDeletion,
   handleManufacturerDeletion,
   editManufacturer,
   deleteManufacturer,
} = require('../controllers/manufacturerController');

const router = express.Router();

router.get('/', getManufacturers);
router.post('/', addManufacturer);
// router.get('/confirm-deletion/:id', confirmManufacturerDeletion);
// router.post('/handle-deletion', handleManufacturerDeletion);
router.put('/:id', editManufacturer);
router.delete('/:id', deleteManufacturer);

module.exports = router;
