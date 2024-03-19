const mongoose = require('mongoose')
const express =require('express');
const User = require('../Models/userSchema')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const authenticateToken = require('../Middleware/jwt-middleware');
const { getProductById, getAllProducts, createNewProduct, updateProductById, deleteProductById } = require('../Controller/ProductController');
const { authenticationRole } = require('../Middleware/role-auth');

const router = express.Router();

router.get( '/:id', getProductById) 

router.get('/',getAllProducts)
 
router.post('/add-product', authenticateToken,authenticationRole(['admin']),createNewProduct )
 
router.put('/update-product/:id',authenticateToken,authenticationRole(['admin']),updateProductById)

router.delete('/delete-product/:id',authenticateToken,authenticationRole(['admin']),deleteProductById)


module.exports= router;

