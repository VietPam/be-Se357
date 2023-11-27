import express from "express";
const router = express.Router();

import {
  checkLoginValidation,
  checkTokenAppearance,
  checkUserValidation,
} from "../../middleware/validation.js";
import {
  convertAccessTokenToUserPayload,
  standarlizeBirthday,
} from "../../middleware/modification.js";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler.js";
/**
 * return all except password, orders,products
 */
router.post("/");
router.patch("/");
router.use("/", NotAllowedMethodHandler);

router.get("/:sellerId");
router.patch("/:sellerId");
router.use("/:sellerId", NotAllowedMethodHandler);

router.get("/products");
router.use("/products", NotAllowedMethodHandler);

router.get("/:sellerId/products");
router.use("/:sellerId/products",NotAllowedMethodHandler);

router.get("/orders");
router.use("/orders",NotAllowedMethodHandler);

router.get("/:sellerId/orders");
router.use("/:sellerId/orders",NotAllowedMethodHandler);

//---------------------------//

router.use(URLNotExistHandler);

export default router;
