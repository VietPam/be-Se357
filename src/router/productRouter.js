const express= require("express");
const router = express.Router();

const productController = require('../controller/productController')

router.get('/getAllProductType',productController.getAllProductType)
router.get('/type/:id', productController.getProductTypeById)// dung id type lam tham so tren url path


module.exports = router;