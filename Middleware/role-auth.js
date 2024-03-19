const User = require('../Models/userSchema')
const jwt = require('jsonwebtoken');

const authenticationRole = (permission) => {
    return async(req,res,next)=>{

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const user = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        // console.log("role",user);
        // const user  = await User.findOne({email:req.body.email})
        // console.log(permission ,(user.role));
       if(permission.includes(user.newUser.role)){
           next()
        }else{

            res.status(401).json({message:"You don`t have permissions" })
        }

        
    }
}

const viewProfilePermission = async(req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    const newUser = await User.findOne({email: req.body.email})
    const user = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
    // console.log("user",user);
    // console.log("newuser",newUser);

    if(user.newUser._id === req.params.id || user.newUser._id === (newUser._id).toString()){
        next()
    } else{
        res.status(401).json({message:"You don`t have permissions" })
    }



}

module.exports  = {authenticationRole,viewProfilePermission}