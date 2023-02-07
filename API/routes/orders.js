const express = require('express') ; 
const router = express.Router() ; 


const check_auth = require('../middleware/check-auth') ; 


// order controller file 
const order_controller = require('../controllers/order') ; 

router.get('/' , check_auth , order_controller.order_get_all );

router.post('/', check_auth , order_controller.order_post);

router.get('/:orderId' ,check_auth , order_controller.order_detail );

router.delete('/:orderId' ,  check_auth , order_controller.order_delete);

module.exports = router ; 