const express=require("express")
const router = express.Router();
const typeProductController = require("../controller/typeProductController");

router.get('/getAllProductType',typeProductController.getAllProductType)
router.get('/getAllChildrenIdByParentId',typeProductController.getAllChildrenIdByParentId)
router.get('/getAllParentId',typeProductController.getAllParentId)

router.post('/new',typeProductController.addTypeProduct)
module.exports =router