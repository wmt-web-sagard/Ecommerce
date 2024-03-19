const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

 function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log( "token",token); 

    if(token===null) return res.status(401).json({msg:"You are not authorized"})

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return  res.sendStatus(403) 
        // console.log(user);
        req.user = user
        next()

    })

}

module.exports = authenticateToken