const express = require('express');
const { getAllItem, getItemById, addItem, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();


router.get('/getAllItem', getAllItem);


router.get('/getSingleItem/:id', getItemById);


router.post('/createItem', addItem);


router.put('/updateItem/:id', updateItem);


router.delete('/deleteItem/:id', deleteItem);

module.exports = router;
