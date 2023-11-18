const express= require("express");
const router = express.Router();

const shopController = require('../controller/shopController')
router.get('/all',shopController.getAll);
router.post('/new',shopController.createNew);


module.exports = router;