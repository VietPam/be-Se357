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

router.post("/");
router.get("/");
router.get("/:buyerId");
router.patch("/:buyerId/password");
router.patch("/:buyerId/activation-status");
router.get("/:buyerId/gender");
router.put("/:buyerId/gender");
router.get("/:buyerId/phones");
router.put("/:buyerId/phones");
router.get("/:buyerId/addresses");
router.put("/:buyerId/addresses");
router.get("/:buyerId/favourite-products");
router.put("/:buyerId/favourite-products");
router.post("/:buyerId/favourite-products/product");
router.delete("/:buyerId/favourite-products/product/:productId");
router.get("/:buyerId/orders");
router.get("/:buyerId/reviews");
router.get("/:buyerId/shopping-cart");
router.put("/:buyerId/shopping-cart");
router.post("/:buyerId/shopping-cart/item");
router.patch("/:buyerId/shopping-cart/item/:itemId");
router.delete("/:buyerId/shopping-cart/item/:itemId");

//---------------------------//

router.use(URLNotExistHandler);

export default router;