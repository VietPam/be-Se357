import express from "express";
const router = express.Router();

import {
  checkLoginValidation,
  checkTokenAppearance,
  checkUserValidation,
  checkAdminRight
} from "../../middleware/validation.js";
import {
  convertAccessTokenToUserID,
  standarlizeUserData,
} from "../../middleware/modification.js";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler.js";
import BuyersController from "../../controller/buyersController.js";

router.get("/public",
checkAdminRight,BuyersController.getPublicBuyers);
router.use("/public",NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export default router;



