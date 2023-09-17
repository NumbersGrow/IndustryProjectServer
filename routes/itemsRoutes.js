const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemsControllers');

//Seeing route while waiting for data 
router.use((req, res, next) => {
    res.send("Routes for items go here."); 
    next();  
});

router.post('/',  controller.createItem );
router.get('/', controller.getAllItems );
router.get('/:id',  controller.getItem );
router.put('/:id', controller.updateItem );
router.delete('/:id',  controller.deleteItem );

module.exports = router;