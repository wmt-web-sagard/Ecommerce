 
const  cloudinary = require('cloudinary').v2;
const fs = require('fs')
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath)return null

        const response =    cloudinary.uploader.upload(localFilePath , {resource_type : 'auto'})

        console.log(response);

        return response
         

    }catch(err){
        fs.unlink(localFilePath)
    }
}

module.exports = {uploadOnCloudinary}