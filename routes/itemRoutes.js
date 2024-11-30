const express = require('express');
const {
   getItems,
   addItem,
   editItem,
   deleteItem,
   updateStock,
   selectItem,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/', getItems);
router.post('/', addItem);
router.put('/:id', editItem);
router.delete('/:id', deleteItem);
router.post('/update-stock', updateStock);

router.post('/select-item/:itemId', selectItem);

module.exports = router;
