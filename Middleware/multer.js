const multer = require( 'multer' );

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/temp');
    },
    filename: function (req, file, cb) {
      
        const fileExt = file.originalname.split('.').pop(); 
        const filename = `${file.fieldname}-${Date.now()}.${fileExt}`;
        cb(null, filename);
    }
  })
  
 const upload = multer({ storage: storage })


 module.exports = { upload }