const express = require('express');
const {
   getAllItems,
   addItem,
   editItem,
   deleteItem,
   addStock,
   removeStock,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.post('/', addItem);
router.put('/:id', editItem);
router.delete('/:id', deleteItem);
router.post('/:id/add-stock', addStock);
router.post('/:id/remove-stock', removeStock);

module.exports = router;
