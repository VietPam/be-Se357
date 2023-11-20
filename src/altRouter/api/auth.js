const express = require("express");
const router = express.Router();
import {checkEmailValidation, checkUserValidation, verifyAccessToken, verifyRefreshToken } from "../Middleware/validation";
import { NotAllowedMethodHandler, URLNotExistHandler } from "../Middleware/errorHandler";


router.post("/login")
router.post("/logout")
router.post("/register")
router.post("/accessToken/refresh")
