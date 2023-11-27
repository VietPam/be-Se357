import express from "express";
const router = express.Router();

import {
  checkLoginValidation,
  checkTokenAppearance,
  checkUserValidation,
} from "../../middleware/validation.js";
import {
  convertAccessTokenToUserID,
  standarlizeUserData,
} from "../../middleware/modification.js";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler.js";


router.post("/");
router.use("/",NotAllowedMethodHandler);

router.get("/:orderId");
router.patch("/:orderId");
router.use("/:orderId",NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export default router;





