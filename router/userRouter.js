const express=require("express")
const router = express.Router();
const verifyToken = require("../src/middleware/auth")
const userController = require("../src/controller/userController");

router.get('/verify',verifyToken, userController.getUser)
