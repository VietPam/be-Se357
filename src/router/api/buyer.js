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
 * return all except password, orders, reviews, favourite products,shopping cart
 */
router.post("/");
router.patch("/");
router.use("/",NotAllowedMethodHandler);

router.get("/:buyerId");
router.patch("/:buyerId");
router.use("/:buyerId",NotAllowedMethodHandler);

router.get("/favourite-products");
router.put("/favourite-products");
router.use("/favourite-products",NotAllowedMethodHandler);

router.get("/:buyerId/favourite-products");
router.use("/:buyerId/favourite-products",NotAllowedMethodHandler);

router.post("/favourite-products/product");
router.use("/favourite-products/product",NotAllowedMethodHandler);

router.delete("/favourite-products/product/:productId");
router.use("/favourite-products/product/:productId",NotAllowedMethodHandler);

router.get("/orders");
router.use("/orders",NotAllowedMethodHandler);

router.get("/:buyerId/orders");
router.use("/:buyerId/orders",NotAllowedMethodHandler);


router.get("/reviews");
router.use("/reviews",NotAllowedMethodHandler);

router.get("/:buyerId/reviews");
router.use("/:buyerId/reviews",NotAllowedMethodHandler);

router.get("/shopping-cart");
router.put("/shopping-cart");
router.use("/shopping-cart",NotAllowedMethodHandler);

router.post("/shopping-cart/item");
router.use("/shopping-cart/item",NotAllowedMethodHandler);

router.patch("/shopping-cart/item/:itemId");
router.delete("/shopping-cart/item/:itemId");
router.use("/shopping-cart/item/:itemId",NotAllowedMethodHandler);

//---------------------------//

router.use(URLNotExistHandler);

export default router;