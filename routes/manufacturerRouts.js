const express = require('express');
const {
   getAllManufacturers,
   addManufacturer,
} = require('../controllers/manufacturerController');

const router = express.Router();

router.get('/', getAllManufacturers);
router.post('/', addManufacturer);

module.exports = router;
