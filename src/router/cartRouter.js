const express= require("express");
const router = express.Router();

const cartController = require('../controller/cartController')

router.get('/getCartByUserId/',cartController.getCartByUserId)
router.post('/createCart',cartController.createCart)
module.exports = router;