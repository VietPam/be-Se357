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

router.get("/");
router.post("/");
router.patch("/");
router.use("/",NotAllowedMethodHandler);

router.patch("/:adminId");
router.use("/:adminId",NotAllowedMethodHandler)

router.use(URLNotExistHandler);

export default router;
