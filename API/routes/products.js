const express = require('express') ; 
const router = express.Router() ; 


router.get('/' , (req , res , next)=>
{
    res.status(200).json(
        {
            message : 'Getting request for products'
        }
    );
})

router.post('/'  , (req, res , next)=>
{
    res.status(201).json(
        {
            message: 'Handling POST request to products'
        }
    );
})

router.get('/:productId ', (req , res , next)=>
{
    const id = req.params['productId '];
    if(id === 'Hemang')
    {
        res.status(200).json(
            {
                message: 'You discovered me !' 
            }
        );
    }
    else
    {
        res.status(200).json(
            {
                message : 'Hey , you passed an ID' 
            }
        );
    }
})

router.patch('/:productId' , (req , res , next)=>
{
    res.status(200).json({
        message:'Product Updated !' 
    });
})

router.delete('/:productId' , (req , res , next)=>
{
    res.status(200).json({
        message:'Product Deleted !' 
    });
})
module.exports = router ; 