const User = require('../Models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { uploadOnCloudinary } = require('../utils/cloudinary.utils');

const getAllUser = async (req,res)=>{
    const users = await User.find()
    if(!users)return res.status(401).json({msg:'no data'});
    res.status(200).json(users);
}

const getUserById = async (req,res)=>{
    const findUser = await User.findById(req.params.id).select("-password")
    if(!findUser){
        return res.status(404).json({msg:"No user found"})
    }
    res.json(findUser);

}

const authUserRegister = async (req,res) =>{
    const {body} = req

    if (!body.name && !body.password && !body.email && !body.phoneNumber && !body.gender) {
        console.log(body);
        res.status(400).send( {message: "Missing fields"} )
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        res.status(400).send( {message: "Missing avatar image"} ) 
    }
 


    try{
        const salt = bcrypt.genSaltSync(10)
        const hashPassword  =bcrypt.hashSync(body.password,salt);

        const avatar = await uploadOnCloudinary(avatarLocalPath)

        if (!avatar) {
            throw new ApiError(400, "Avatar file is required")
        }
    

        const newUser = await User.create({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email,
            phoneNumber:req.body.phoneNumber,
            gender: req.body.gender,
            avatar:avatar.url
             
        })

        if(body.role){
            newUser.role = await body.role
        }
    
        await newUser.save()
    
        res.status(201).json(newUser);

    }catch(err){
        console.log(err);
        res.status(400).json({message:"error"});
    }
}

const authUserLogIn = async (req,res) =>{
    const {body} = req

    if ( !body.password && !body.email) {
        res.status(400).send( {message: "Missing fields"} )
    }


    try{
        const newUser = await User.findOne({email: req.body.email})
        
        if (!newUser) {
            res.status(400).json({ message: 'Email is  not registered' });
        } 
        if(bcrypt.compareSync(body.password, newUser.password)){

            const token = jwt.sign({newUser:newUser}    ,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' });
      
            res.status(200).json({newUser,AccessToken:token,message:'LogIn successful'});
        } else{ 
            res.status(400).json({ message: 'Wrong Password!' });
        }


    }catch(err){
        console.log(err);
        res.status(400).json({message:"error"});
    }
}

const changeUserPassword = async (req,res)=>{
    const {body} = req

    if ( !body.password && !body.email && !body.newPassword) {
        res.status(400).send( {message: "Missing fields"} )
    }
    try{
        const newUser = await User.findOne({email: body.email})
        console.log("oldpas",newUser.password);

        if (!newUser) {
            res.status(400).json({ message: 'Email is  not registered' });
        } 
        if(bcrypt.compareSync(body.password, newUser.password)){
            const salt = bcrypt.genSaltSync(10)
            const hashNewPassword  =bcrypt.hashSync(body.newPassword,salt);

            console.log(hashNewPassword);

            const updatedUser = await newUser.updateOne({ password:hashNewPassword})
            // console.log(updatedUser);  

            res.status(200).json({message:'Password updated successful'});
        } else{ 
            res.status(400).json({ message: 'Wrong Password!' });
        }


    }catch(err){
        console.log(err);
        res.status(400).json({message:"error"});
    }
}




module.exports = {getAllUser,getUserById,authUserRegister,authUserLogIn,changeUserPassword}