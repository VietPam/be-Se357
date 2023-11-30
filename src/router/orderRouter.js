const express = require("express");
const router = express.Router();

const orderController = require('../controller/orderController')

router.post('/createOrder',orderController.createOrder)
router.get('/getAllOrderByUserId',orderController.getAllOrderByUserId)
router.get('/getAllOrderByShopId',orderController.getAllOrderByShopId)


module.exports = router;