const express = require('express');
const { getCategories } = require('../controllers/categoryController');
const { getManufacturers } = require('../controllers/manufacturerController');
const { getItems } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getCategories, getManufacturers, getItems, (req, res) => {
   res.render('dashboard', {
      categories: req.categories,
      manufacturers: req.manufacturers,
      items: req.items,
      selectedItem: null,
   });
});

module.exports = router;
