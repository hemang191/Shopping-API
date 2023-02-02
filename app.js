const express = require('express') ; 
const app = express() ; 
const bodyParser = require('body-parser') ; 
const mongoose = require('mongoose');

require('dotenv').config() ; 

const db = process.env.dbLink ;

// Database Connection
mongoose.set('strictQuery' , true) 
mongoose.connect(db , {useNewUrlParser : true})
.then(()=> console.log('MongoDB connected'))
.catch(err=> console.log(err)) ; 





const productRoutes = require('./API/routes/products') ; 
const orderRoutes = require('./API/routes/orders') ;


app.use(bodyParser.urlencoded({extended: false})) ; 
app.use(bodyParser.json()) ; 

// Handling cors error only occur on browser not on POSTMAN 
app.use((req , res , next)=>
{
    res.header("Acess-Control-Allow-Origin" , "*") ; 
    res.header(
        "Access-Control-Allow-Headers" , 
        "Origin , X-Requested-With , Content-Type , Accept , Authorization"
    );
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods' , 'PUT , POST , PATCH ,DELETE');
        return res.status(200).json({}) ; 
    }

    next() ; 
})
app.use('/products' , productRoutes) ; 
app.use('/orders' , orderRoutes) ; 

// here this middleware handles the request for routes not present
app.use((req , res , next)=>
{
    const error = new Error('Not found') ; 
  
    error.status(404) ; 
    next(error) ;
});


// here this middleware handles the request for the db errors and others one 
app.use((error , req , res , next) =>
{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message 
        }
    });
});

module.exports = app ; 