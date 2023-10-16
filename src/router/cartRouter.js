const express= require("express");
const router = express.Router();

const cartController = require('../controller/cartController')

router.get('/getCartByUserId/:id',cartController.getCartByUserId)

module.exports = router;