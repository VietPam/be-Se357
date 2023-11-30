const express = require("express");
const router = express.Router();

const orderController = require('../controller/orderController')

router.post('/createOrder',orderController.createOrder)
router.get('/getAllOrderByUserId/:id',orderController.getAllOrderByUserId)
router.get('/getAllOrderByShopId/:id',orderController.getAllOrderByShopId)


module.exports = router;