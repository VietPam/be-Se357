const express = require("express");
const router = express.Router();

const addressController = require('../controller/addressController')    

router.post('/addAddress',addressController.addAddress)
router.patch('/updateAddress',addressController.updateAddress)

module.exports = router;