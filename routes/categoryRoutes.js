const express = require('express');
const {
   getAllCategories,
   addCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', addCategory);

module.exports = router;
