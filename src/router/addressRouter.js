const express = require("express");
const router = express.Router();

const addressController = require('../controller/addressController')    
router.get('/byUserId',addressController.getAllAddressByUserId)
router.post('/new',addressController.addAddress)
router.patch('/update',addressController.updateAddress)


router.delete('/',addressController.deleteAddress)
module.exports = router;