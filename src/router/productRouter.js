const express= require("express");
const router = express.Router();

const productController = require('../controller/productController')

router.get('/listProduct',productController.getAllProducts)
router.get('/homepage',productController.getProductInHomePage)
router.get('/detailByProductId',productController.findProductByProductId)
router.post('/',productController.createProduct)
module.exports = router;