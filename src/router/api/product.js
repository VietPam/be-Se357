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

router.get("/public/:productId");
router.patch("/public/:productId");
router.use("/public/:productId",NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export default router;




