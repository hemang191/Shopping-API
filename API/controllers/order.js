const Order = require('../models/order') ;
const Product = require('../models/product') ; 
const mongoose = require('mongoose'); 


exports.order_get_all = (req , res , next)=>
{
    /*Order.find()
    .select('-__v')
    .populate('product' , 'name')
    .then(docs =>
        {
            res.status(200).json({
                count : docs.length , 
                order: docs.map(doc => {
                    return {
                        _id : doc._id , 
                        product : doc.productId,
                        quantity : doc.quantity,
                        request:{
                            type : 'GET' ,
                            url : 'http://localhost:3200/orders/' + doc._id 
                        }
                    }
                })
            })
        })
    .catch(err =>
        {
            console.log(err) ;
            res.status(500).json({
                error : err 
            }); 
        })

    */
        Order.find()
        .select('-__v')
        .populate('product', 'name')
        .exec()
        .then(docs => {
          res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
              return {
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                  type: "GET",
                  url: "http://localhost:3200/orders/" + doc._id
                }
              };
            })
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
}


exports.order_post = (req , res ,next)=>
{
    // first of all check that product exist or not for which order is going to place 
    Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3200/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
    
}

exports.order_detail = (req, res , next)=>
{
    // check whether orderId is valid or not 
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order =>
        {
            if(!order)
            {
                return res.status(404).json({
                    message : "Order not found" 
                });
            }
            res.status(200).json({
                order : order , 
                request : {
                    type : "GET" , 
                    url : "http://localhost:3200/orders"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err 
            });
        });
       
}

exports.order_delete = (req, res , next)=>
{
    Order.remove({_id : req.params.orderId})
    .exec()
    .then(result =>{
        if(!result)
        {
            return res.status(404).json({
                message : "Order Not found" 
            });
        }
        res.status(200).json({
            message : "Order deleted" , 
            request:{
                type : "POST" , 
                url : "http://localhost3200/orders" , 
                body : {productId : "ID" , quantity : "Nubmer"}
            }
        });
    })
    .catch(err =>{
        res.status(500).json({
            error : err 
        }); 
    }); 
}