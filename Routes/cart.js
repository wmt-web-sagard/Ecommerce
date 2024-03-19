const express =require('express');
const { authenticationRole } = require('../Middleware/role-auth');
const authenticateToken = require('../Middleware/jwt-middleware');
const { addToCart, clearCart, getUserCurrentCart, deleteProductCart } = require('../Controller/CartController');

const router = express.Router();

router.post( '/addToCart', authenticateToken, addToCart) 

router.delete('/clear-cart',clearCart)

router.get('/get-cart',getUserCurrentCart)

router.delete('/remove-cart/:id',deleteProductCart)


module.exports= router;