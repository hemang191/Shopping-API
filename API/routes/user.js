const express = require("express");
const router = express.Router();
const check_auth = require('../middleware/check-auth');
const user_controller = require('../controllers/user') ; 

const { route } = require("./products");


router.get('/' , (req , res, next)=>
{
    res.status(200).json({
        msg : 'Welcome' 
    })
})
 
router.post('/signup' , user_controller.user_signup ) ; 


router.post('/login', user_controller.user_login );


// if i have to delete a user from database 

router.delete('/:userId' ,  check_auth , user_controller.user_delete); 

module.exports = router ;
