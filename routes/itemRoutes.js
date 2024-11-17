const express = require('express');
const { getAllItems, addItem } = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.post('/', addItem);

module.exports = router;
