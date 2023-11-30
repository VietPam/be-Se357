const express= require("express");
const router = express.Router();

const productController = require('../controller/productController')

//router.get('/list',productController.getAllProducts)
router.get('/homepage',productController.getProductInHomePage)
router.get('/detail',productController.findProductByProductId)
router.post('/new',productController.createProduct)
module.exports  = router;