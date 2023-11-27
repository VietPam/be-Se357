import express from "express";
const router = express.Router();
import AuthController from "../../controller/authController.js";
import {
  checkLoginValidation,
  checkTokenAppearance,
  checkUserValidation,
} from "../../middleware/validation.js";
import {
  convertAccessTokenToUserPayload,
  convertRefreshTokenToUserPayload,
  standarlizeBirthday,
} from "../../middleware/modification.js";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler.js";

router.post("/login", checkLoginValidation, AuthController.login);
router.use("/login", NotAllowedMethodHandler);

// router.post("/seller/login",checkLoginValidation,);
// router.use("/seller/login", NotAllowedMethodHandler,);

router.post(
  "/logout",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  AuthController.logout
);
router.use("/logout", NotAllowedMethodHandler);

router.post(
  "/buyer/register",
  checkUserValidation,
  standarlizeBirthday,
  AuthController.registerBuyer
);
router.use("/buyer/register", NotAllowedMethodHandler);

router.post(
  "/accessToken/refresh",
  checkTokenAppearance,
  convertRefreshTokenToUserPayload,
  AuthController.generateNewAccessToken
);
router.use("/accessToken/refresh", NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export default router;
