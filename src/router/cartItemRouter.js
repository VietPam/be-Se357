const express= require("express");
const router = express.Router();

const cartItemController = require('../controller/cartItemController')

router.post('/addCartItem',cartItemController.addCartItem)
//router.get('/findAllCartItem',cartItemController.findAllCartItem)
router.get('/findCartItemsByUserId/:id',cartItemController.findCartItemsByUserId)
router.get('/findCartItemById/:id',cartItemController.findCartItemById)
router.patch('/updateCartItem',cartItemController.updateCartItem)
router.delete('/deleteCartItem',cartItemController.deleteCartItem)
module.exports = router;