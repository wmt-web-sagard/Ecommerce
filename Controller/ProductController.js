const Product = require('../Models/productSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getAllProducts = async(req,res)=>{
    const products = await Product.find();

    if(!products){
        res.status(400).send({message: "No products Here"})
    }

    res.status(200).json(products);
}

const getProductById = async(req,res)=>{
    let productId= req.params.id;

    try {
        const product =   await Product.findOne({_id : productId})
        
        if (!product) {
            return res.status(400).send({message: "The product does not exist. Please try again."})
        }

        res.json(product);

    } catch (err) {
        res.status(500).send({
            message: `Error while making the request ${err}`
        })
    }
    
    
}

const createNewProduct =   async (req,res)=> { 
    const {body}  = req; 

    if( !body.productName || !body.discription || !body.brand || !body.originalPrice   ){
         res.status(400).send({message:"Please fill all fields"});
    }

    const  newProduct = new Product({
        productName:body.productName,
        discription:body.discription,
        brand:body.brand,
        originalPrice:body.originalPrice,
    });

    if(body.discountedPercentage){
        newProduct.discountedPercentage =await body.discountedPercentage;
        newProduct.discountedPrice =await body.originalPrice -  ((body.discountedPercentage/100)*body.originalPrice );
    }else{
        newProduct.discountedPrice =await body.originalPrice;
    }

    if(!body.availability){
        newProduct.availability=await body.availability;
    }
    if(!body.categoryId){
        newProduct.categoryId =await body.categoryId ; 
    }

    await  newProduct.save();

    res.status(201).send(newProduct);
}

const updateProductById = async(req,res)=>{
    const {body} = req;
    // console.log(body);
    let id = req.params.id;
    const productUpdate  = await Product.findById(id)
    
    console.log("hiiii",productUpdate);
    
     await productUpdate.updateOne({
        productName:body.productName,
        discription:body.discription,
        brand:body.brand,
        originalPrice:body.originalPrice,
    })
    
    if(body.discountedPercentage){
        productUpdate.discountedPercentage =await body.discountedPercentage;
        productUpdate.discountedPrice =await body.originalPrice -  ((body.discountedPercentage/100)*body.originalPrice );
    }else{
        if(productUpdate.discountedPercentage){
            productUpdate.discountedPrice =await body.originalPrice -  ((productUpdate.discountedPercentage/100)*body.originalPrice )

        }else{
            productUpdate.discountedPrice =await body.originalPrice
        }
    }

    if(!body.availability){
        productUpdate.availability=await body.availability;
    }
    if(!body.categoryId){
        productUpdate.categoryId =await body.categoryId ; 
    }


    await productUpdate.save()

    res.json(productUpdate)
}


const deleteProductById = async(req,res)=>{
    const id = req.params.id
    const productDelete  = await Product.findByIdandDelete(id)
    if(!productDelete){
        return res.status(404).send('No product with this ID')
    }
    res.status(200).send("Product  has been deleted")
}

 
 
module.exports = {getAllProducts,createNewProduct,getProductById,updateProductById,deleteProductById}