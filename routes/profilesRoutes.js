const express = require('express');
const router = express.Router();
const controller = require('../controllers/profilesControllers');

router.use((req, res, next) => {
    res.send("Routes for profiles go here."); 
    next();  
});

router.post('/', controller.createProfile);
router.get('/', controller.getAllProfiles);
router.get('/:id',controller.getProfile);
router.put('/:id', controller.updateProfile);
router.delete('/:id', controller.deleteProfile);

module.exports = router;