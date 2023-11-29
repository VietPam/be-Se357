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
router.use("/public/:productId",NotAllowedMethodHandler);

router.get("/protected/:productId");
router.use("/protected/:productId",NotAllowedMethodHandler);

router.get("/:productId");
router.patch("/:productId");
router.use("/:productId",NotAllowedMethodHandler);

router.use(URLNotExistHandler);

export default router;




