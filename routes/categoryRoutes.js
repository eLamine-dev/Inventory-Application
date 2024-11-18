const express = require('express');
const {
   getAllCategories,
   addCategory,
   deleteCategory,
   confirmCategoryDeletion,
   handleCategoryDeletion,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', addCategory);
router.get('/confirm-deletion/:id', confirmCategoryDeletion);
router.post('/handle-deletion', handleCategoryDeletion);
router.delete('/:id', deleteCategory);

module.exports = router;
