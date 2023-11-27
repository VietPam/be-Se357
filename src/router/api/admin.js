import express from "express";
const router = express.Router();

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

router.post("/");
router.get("/");
router.patch("/password");
router.patch("/:adminId/password");
router.patch("/name");
router.patch("/:adminId/activation-status");

router.use(URLNotExistHandler);

export default router;
