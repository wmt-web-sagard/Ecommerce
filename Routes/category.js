const mongoose = require('mongoose')
const express =require('express');
const authenticateToken = require('../Middleware/jwt-middleware'); 
const { authenticationRole } = require('../Middleware/role-auth');
const { getCategoryById, getAllCategory, createNewCategory, updateCategory, deleteCategory } = require('../Controller/CategoryController');

const router = express.Router();

router.get( '/:id', getCategoryById) 

router.get('/',getAllCategory)
 
router.post('/add-product', authenticateToken,authenticationRole(['admin']),createNewCategory )
 
router.put('/update-product/:id',authenticateToken,authenticationRole(['admin']),updateCategory)

router.delete('/delete-product/:id',authenticateToken,authenticationRole(['admin']),deleteCategory)


module.exports= router;