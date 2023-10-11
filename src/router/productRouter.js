const express= require("express");
const router = express.Router();

const productController = require('../controller/productController')

router.get('/getAllProductType',productController.getAllProductType)
router.get('/',productController.getAllProducts)

router.post('/',productController.createProduct)
module.exports = router;