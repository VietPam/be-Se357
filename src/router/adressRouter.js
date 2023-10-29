const express = require("express");
const router = express.Router();

const addressController = require('../controller/addressController')    
router.get('/getAllAddressByUserId',addressController.getAllAddressByUserId)
router.post('/addAddress',addressController.addAddress)
router.patch('/updateAddress',addressController.updateAddress)
router.delete('/delete',addressController.deleteAddress)
module.exports = router;