const express=require("express")
const router = express.Router();
const verifyToken = require("../middleware/auth")
const userController = require("../controller/userController");

router.get('/verify',verifyToken, userController.getUser)


router.post('/register',userController.Register)
router.post('/login',userController.Login);
module.exports =router