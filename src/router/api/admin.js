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
import adminsController from "../../controller/adminsController.js";

router.get(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  adminsController.getAdminByID
);
router.post(
  "/",
  checkUserValidation,
  standarlizeBirthday,
  adminsController.createNewAdmin
);
router.patch(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialAdminDataValidation,
  standarlizeBirthday,
  addUserIdFromRequestHeaderToRequestParams,
  adminsController.updateAdmin
);
router.use("/", NotAllowedMethodHandler);

router.get(
  "/:adminId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccessRight,
  adminsController.getAdminByID
);
router.patch(
  "/:adminId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialAdminDataValidation,
  standarlizeBirthday,
  checkAccessRight,
  adminsController.updateAdmin
);
router.use("/:adminId", NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export default router;
