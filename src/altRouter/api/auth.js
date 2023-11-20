const express = require("express");
const router = express.Router();
import { checkTokenAppearance,checkUserValidation } from "../../middleware/validation";
import {
  convertAccessTokenToUserID,
  convertRefreshTokenToUserID,
} from "../../middleware/modification";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler";

router.post("/login",);
router.use("/login", NotAllowedMethodHandler);

router.post("/logout",checkTokenAppearance,convertAccessTokenToUserID,);
router.use("/logout", NotAllowedMethodHandler);

router.post("/buyer/register",checkUserValidation);
router.use("/buyer/register", NotAllowedMethodHandler);

router.post("/accessToken/refresh");
router.use("/accessToken/refresh", NotAllowedMethodHandler);

router.use(URLNotExistHandler);