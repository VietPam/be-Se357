const express= require("express");
const router = express.Router();
const cartItemController = require('../controller/cartItemController')

// bỏ thành CartItem, đổi thành danh từ cho phù hơp
//router.get('/findAllCartItem',cartItemController.findAllCartItem)
//router.get('/findCartItemById/:id',cartItemController.findCartItemById)

router.post('/additem',cartItemController.addCartItem)
router.get('/findCartByUserId',cartItemController.findCartItemsByUserId)
router.patch('/updateCartItem',cartItemController.updateCartItem)
router.delete('/deleteById',cartItemController.deleteById)


//router.delete('/deleteAllCartItemByUserId',cartItemController.deleteAllCartItemByUserId)



//router.get('/cleanCartItem',cartItemController.removeCartiTemWhichHasRemovedProductID)
module.exports = router;