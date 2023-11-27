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

router.get("/");
router.post("/");
router.patch("/:buyerId/password");
router.get("/:buyerId/gender");
router.put("/:buyerId/gender");
router.get("/:buyerId/phones");
router.put("/:buyerId/phones");
router.get("/:buyerId/addresses");
router.put("/:buyerId/addresses");
router.get("/:buyerId/favourite-products");
router.put("/:buyerId/favourite-products");
router.post("/:buyerId/favourite-product");
router.delete("/:buyerId/favourite-product/:productId");
router.get("/:buyerId/orders");
router.get("/:buyerId/reviews");
router.get("/:buyerId/shopping-cart");
router.put("/:buyerId/shopping-cart");
router.post("/:buyerId/cart-item");
router.patch("/:buyerId/cart-item/:cartItemId");
router.delete("/:buyerId/cart-item/:cartItemId");

//---------------------------

router.use(URLNotExistHandler);
