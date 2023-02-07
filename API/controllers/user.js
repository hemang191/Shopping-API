const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken') ; 


const User = require("../models/user");

exports.user_signup = (req , res , next)=>
{
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length >=1)
        {
            return res.status(409).json({
                msg : "mail exists" 
            })
        }
        else
        {
            bcrypt.hash(req.body.password , 10 , (err , hash)=>
        {
         if(err)
         {
            return res.status(500).json({
                error : err 
            });
         }
        else 
         {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email : req.body.email ,
                password : hash
            });

            user.save()
            .then(result =>
                {
                    console.log(result) ; 
                    res.status(201).json({
                        msg : "User Created" 
                    });
                })
            .catch(error => {
                console.log(error) ; 
                res.status(500).json({
                    err : error
                })
            })
        }
    })
        }
    })
    
}

exports.user_login = (req, res , next)=>
{
    User.findOne({email : req.body.email})
      .exec()
      .then(user =>{
        if(user.length<1)
        {
            return res.status(401).json({
                message : 'Auth failed' 
                // status code : 401 -> unauthorised 
            });
        }
        bcrypt.compare(req.body.password, user.password ,(err , result)=>
        {
            if(err)
            {
                return res.status(401).json({
                    message : 'Auth failed' 
                })
            }
            if(result)
            {
                const token = jwt.sign(
                    {
                      email : user.email,
                      userId : user._id 
                    },
                    process.env.JWT_key ,
                    {
                        expiresIn  : 60*60 
                    }
                );
                return res.status(200).json({
                    message : 'Auth successful',
                    token : token 
                });
            }
            res.status(401).json({
                message : 'Auth failed' 
            });
        });
      })
}

exports.user_delete = (req, res, next)=>
{
    User.deleteOne({_id : req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "User Deleted" 
        });
    })
    .catch(err =>{
        console.log(err) ; 
        res.status(500).json({
            error : err
        });
    });
};
