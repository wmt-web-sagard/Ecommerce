const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./Routes/user')
const productRoute = require('./Routes/product')
const cartRoute = require('./Routes/cart')
const bodyParser = require('body-parser')


mongoose.connect(process.env.MONGODB_KEY)
.then(()=>{
    console.log("MongoDB Connected...");

    const app = express(); 
    app.use(express.static("public")) 
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use('/user',userRoute)
    app.use('/product',productRoute)
    app.use('/cart',cartRoute)




    app.listen(8800,()=>{
        console.log("Server Started On Port 8800");
    })
})
.catch((err)=>{
    console.log("error",err);
})