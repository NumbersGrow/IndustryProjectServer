const express = require('express');
const router = express.Router();
const controller = require('../IndustryProjectServer/controllers/ordersControllers');

router.use((req, res, next) => {
    res.send("Routes for orders go here."); 
    next();  
});

router.post('/',  controller);
router.get('/', controller);
router.get('/:id', controller);
router.put('/:id', controller);
router.delete('/:id',  controller);

module.exports = router;