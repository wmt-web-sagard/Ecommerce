require('dotenv').config()
const mongoose = require('mongoose')
const express =require('express');
const User = require('../Models/userSchema')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const authenticateToken = require('../Middleware/jwt-middleware');
const { getAllUser, authUserLogIn, authUserRegister, getUserById, changeUserPassword } = require('../Controller/UserController');
const { authenticationRole, viewProfilePermission } = require('../Middleware/role-auth');
const { upload } = require('../Middleware/multer');

const router = express.Router();

router.get( '/:id', authenticateToken,viewProfilePermission, getUserById) 

router.get('/',authenticateToken, authenticationRole(['admin']) , getAllUser)
 
router.post('/register', upload.fields([{name:'avatar',maxCount:1}]) ,authUserRegister)
 
router.post('/login', authUserLogIn)

router.put('/changePassword',authenticateToken,viewProfilePermission,changeUserPassword)


 module.exports= router;
