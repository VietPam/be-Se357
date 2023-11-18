const express= require("express");
const router = express.Router();

const cartItemController = require('../controller/cartItemController')
// bỏ thành CartItem, đổi thành danh từ cho phù hơp
router.post('/item',cartItemController.addCartItem)
//router.get('/findAllCartItem',cartItemController.findAllCartItem)
router.get('/findCartItemsByUserId',cartItemController.findCartItemsByUserId)
router.get('/findCartItemById/:id',cartItemController.findCartItemById)
router.patch('/updateCartItem',cartItemController.updateCartItem)
router.delete('/deleteOneCartItem',cartItemController.deleteOneCartItem)
router.delete('/deleteAllCartItemByUserId',cartItemController.deleteAllCartItemByUserId)

router.get('/cleanCartItem',cartItemController.removeCartiTemWhichHasRemovedProductID)
module.exports = router;