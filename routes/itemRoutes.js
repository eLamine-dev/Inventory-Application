const express = require('express');
const {
   getItems,
   addItem,
   editItem,
   deleteItem,
   addStock,
   removeStock,
   selectItem,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/', getItems);
router.post('/', addItem);
router.put('/:id', editItem);
router.delete('/:id', deleteItem);
router.post('/:id/add-stock', addStock);
router.post('/:id/remove-stock', removeStock);

router.post('/select-item/:itemId', selectItem);

module.exports = router;
