const Product = require('../models/product');
const mongoose = require('mongoose') ; 


exports.all_product = (req , res , next)=>
{
    Product.find()
    .select('-__v')
    .exec()
    .then(docs =>
        {
           const response = {
            count : docs.length , 
            products: docs.map(doc => {
                return {
                    name : doc.name ,
                    price: doc.price ,
                    productImage : doc.productImage,
                    _id: doc.id , 
                    request:{
                        type : 'GET' , 
                        url : 'http://localhost:3200/products/' + doc._id
                    }
                }
            })
           }
           res.status(200).json(response) ;
        })
    .catch(err => {
        console.log(err) ;
        res.status(500).json({
            error : err 
        });
    })
}

exports.post_product= (req, res , next)=>
{
    console.log(req.file) ; 
    const product = new Product({
        _id : new mongoose.Types.ObjectId() , 
        name : req.body.name , 
        price : req.body.price ,
        productImage : req.file.path
    });
    product
      .save()
      .then(result => {      
        console.log(result) ; 
        res.status(201).json(
            {
                message: 'Created product succesfully',
                createdProduct : 
                {
                    name : result.name ,
                    price : result.price , 
                    _id : result._id ,
                    request: {
                        type : "GET" ,
                        url : "http://localhost:3200/products/" + result.id 
                    }
                }
            });
       })
       .catch(err => 
        {
            console.log(err)
            res.status(500).json({
                error: err
            });
        }); 
        
}

exports.product_detail = (req , res , next)=>
{
    const id = req.params.productId; 
    console.log(id) ; 
    Product.findById(id)
       .select('-__v')
       .exec()
       .then(doc => 
       {
            console.log("From Database" , doc) ; 
            if(doc)
            {
                res.status(200).json(
                    {
                        product : doc , 
                        request : {
                            type : 'GET' , 
                            description : 'More product clik below ' ,
                            url :  'http://localhost:3200/products' 
                        }
                    }
                ) ;
            }
            else {
                res.status(404)
                .json({message : "No valid entry found for ID"});
            }
            
       })
       .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
       }) ; 
            
         

}

exports.update_product = (req , res , next)=>
{
    const id = req.params.productId ; 
    const update = {} ; 
    for (const  ops of req.body)
    {
        update[ops.propName] = ops.value ; 
    }
    Product.updateOne({_id : id} , {$set : update })
       .exec()
       .then(res =>
        {
            console.log(res) ; 
            res.status(200).json(
                {
                    message : 'Product Updated' , 
                    request : {
                        type : 'GET' , 
                        url :'http://localhost:3200/products/'+ id 
                    }
                }
            ); 
        })
       .catch(err => {
        console.log(err) ; 
        res.status(500).json({error : err})
       });
}

exports.delete_product = (req , res , next)=>
{
    const id = req.params.productId; 
    Product.remove({_id : id})
      .exec()
      .then(result => {
        res.status(200).json(
            {
                message : 'Product Deleted' ,
                request : {
                    type : 'POST' , 
                    url :'http://localhost:3200/products',
                    body : {name : 'String' , price: 'Number'}
                }
            }
        ) ; 
      })
      .catch(err =>{
        console.log(err) ; 
        res.status(500).json({
            error: err
        });
      }); 
}