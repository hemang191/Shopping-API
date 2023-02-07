const express = require('express') ; 
const router = express.Router() ; 
const mongoose = require('mongoose') ; 
const multer = require('multer') ; 
const check_auth = require('../middleware/check-auth') ; 
// now for viewing the image in browser there are two possiblities 

// 1---> make a different router 

// 2 --> make folder view static (publically available )

// storage strategy in multer 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      const  name = new Date().toISOString() + file.fieldname ; 
      cb(null, name);
    }
  });


//const upload = multer ({storage: storage});



const fileFilter  = (req , file , cb)=>
{
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null , true ) ; 
    } 
    else
    {
        cb(null , false) ; 
    }
    
};

const upload = multer({storage : storage ,
 limits:
{
    fileSize : 1024 * 1024 * 5 // upto 5mb can store
},
fileFilter : fileFilter}); 

const { updateOne } = require('../models/product');

const Product = require('../models/product') ;  // import structure from product 

const product_controller = require('../controllers/product'); 

router.get('/' , product_controller.all_product) ; 

// here upload.single parse the form data which we are passing so either use check_auth middleware after it aur pass the token value into header
router.post('/'  , check_auth , upload.single('productImage') , product_controller.post_product); 

router.get('/:productId ', check_auth ,  product_controller.product_detail) ; 

router.patch('/:productId', check_auth , product_controller.update_product ) ; 

router.delete('/:productId' , check_auth , product_controller.delete_product ); 

module.exports = router ;       