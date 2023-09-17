const express = require('express');
const router = express.Router();
const controller = require("../IndustryProjectServer/controllers/ordersBatchControllers");

router.use((req, res, next) => {
    res.send("Routes for batch go here."); 
    next();  
});


router.post('/',  controller.createCartItem );
router.get('',  controller.getAllCartItems );
router.get('/:id',  controller.getCartItem );
router.put('/:id', controller.updateCartItem );
router.delete('/:id', controller.deleteCartItem );

module.exports = router;