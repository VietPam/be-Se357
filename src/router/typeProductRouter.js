const express=require("express")
const router = express.Router();
const typeProductController = require("../controller/typeProductController");

router.get('/getAllProductType',typeProductController.getAllProductType)
router.get('/:id',typeProductController.getTypeProductPath)

router.post('/',typeProductController.addTypeProduct)
module.exports =router