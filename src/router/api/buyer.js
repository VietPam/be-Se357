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
router.get("/info");
router.get("/:buyerId");
router.patch("/password");
router.patch("/:buyerId/password");
router.patch("/:buyerId/activation-status");
router.put("/gender");
router.get("/phones");
router.put("/phones");
router.get("/:buyerId/phones");
router.get("/addresses");
router.put("/addresses");
router.get("/favourite-products");
router.get("/:buyerId/favourite-products");
router.put("/favourite-products");
router.post("/favourite-products/product");
router.delete("/favourite-products/product/:productId");
router.get("/orders");
router.get("/:buyerId/orders");
router.get("/reviews");
router.get("/:buyerId/reviews");
router.get("/shopping-cart");
router.put("/shopping-cart");
router.post("/shopping-cart/item");
router.patch("/shopping-cart/item/:itemId/quantity");
router.delete("/shopping-cart/item/:itemId");

//---------------------------//

router.use(URLNotExistHandler);

export default router;