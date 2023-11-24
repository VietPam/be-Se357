import express from "express";
const router = express.Router();
import AuthController from "../../controller/authController.js";
import {
  checkLoginValidation,
  checkTokenAppearance,
  checkUserValidation,
} from "../../middleware/validation.js";
import {
  convertAccessTokenToUserID,
  convertRefreshTokenToUserID,
  standarlizeUserData
} from "../../middleware/modification.js";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler.js";

router.post("/login", checkLoginValidation, AuthController.login);
router.use("/login", NotAllowedMethodHandler);

// router.post("/seller/login",checkLoginValidation,);
// router.use("/seller/login", NotAllowedMethodHandler,);

router.post("/logout",checkTokenAppearance,convertAccessTokenToUserID,AuthController.logout);
router.use("/logout", NotAllowedMethodHandler);

router.post("/buyer/register",checkUserValidation,standarlizeUserData, AuthController.registerBuyer);
router.use("/buyer/register", NotAllowedMethodHandler);

router.post("/seller/register",checkUserValidation,standarlizeUserData,AuthController.registerSeller);
router.use("/seller/register", NotAllowedMethodHandler);

// router.post("/admin/register",checkUserValidation,);
// router.use("/admin/register", NotAllowedMethodHandler);

router.post(
  "/accessToken/refresh",
  checkTokenAppearance,
  convertRefreshTokenToUserID,
  AuthController.generateNewAccessToken
);
router.use("/accessToken/refresh", NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export default router;