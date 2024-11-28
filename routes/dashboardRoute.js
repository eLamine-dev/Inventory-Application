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
      selectedItem: req.session.selectedItem,
      selectedItemId: req.session.selectedItemId,
      selectedCategoryId: req.session.selectedCategoryId,
   });
});

module.exports = router;
