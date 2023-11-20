const express = require("express");
const router = express.Router();
import AuthController from "../../controller/authController";
import {
  checkLoginValidation,
  checkTokenAppearance,
  checkUserValidation,
} from "../../middleware/validation";
import {
  convertAccessTokenToUserID,
  convertRefreshTokenToUserID,
} from "../../middleware/modification";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler";

router.post("/login", checkLoginValidation, AuthController.login);
router.use("/login", NotAllowedMethodHandler);

// router.post("/seller/login",checkLoginValidation,);
// router.use("/seller/login", NotAllowedMethodHandler,);

router.post(
  "/logout",
  checkTokenAppearance,
  convertAccessTokenToUserID,
  AuthController
);
router.use("/logout", NotAllowedMethodHandler);

router.post(
  "/buyer/register",
  checkUserValidation,
  AuthController.buyerRegistation
);
router.use("/buyer/register", NotAllowedMethodHandler);

router.post(
  "/seller/register",
  checkUserValidation,
  AuthController.sellerRegistation
);
router.use("/seller/register", NotAllowedMethodHandler);

// router.post("/admin/register",checkUserValidation,);
// router.use("/admin/register", NotAllowedMethodHandler);

router.post(
  "/accessToken/refresh",
  checkTokenAppearance,
  convertRefreshTokenToUserID,
  AuthController.refreshAccessToken
);
router.use("/accessToken/refresh", NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export router;