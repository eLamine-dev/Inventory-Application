const express = require('express');
const {
   getCategories,
   addCategory,
   editCategory,
   deleteCategory,
   confirmCategoryDeletion,
   handleCategoryDeletion,
   selectCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getCategories);

router.post('/', addCategory);
router.get('/confirm-deletion/:id', confirmCategoryDeletion);
router.post('/handle-deletion', handleCategoryDeletion);
router.put('/:id', editCategory);
router.delete('/:id', deleteCategory);

router.post('/select-category/:categoryId', selectCategory);

module.exports = router;
