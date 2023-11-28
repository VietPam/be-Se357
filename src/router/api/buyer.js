import express from "express";
const router = express.Router();

//-----Middleware-----//
import {
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

//-----Service-----//
import buyerController from "../../controller/buyerController.js";

/**
 * return all except password, orders, reviews, favourite products,shopping cart
 */
router.get(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyerController.getBuyerByID
);
router.post(
  "/",
  checkUserValidation,
  standarlizeBirthday,
  buyerController.createNewBuyer
);
router.patch(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialBuyerDataValidation,
  standarlizeBirthday,
  addUserIdFromRequestHeaderToRequestParams,
  buyerController.updateBuyer
);
router.use("/", NotAllowedMethodHandler);

router.get(
  "/:buyerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  standarlizeBirthday,
  checkAccess,
  buyerController.getBuyerByID
);

router.patch(
  "/:buyerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialBuyerDataValidation,
  standarlizeBirthday,
  checkAccess,
  buyerController.updateBuyer
);
router.use("/:buyerId", NotAllowedMethodHandler);

router.get(
  "/favourite-products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyerController.
);
router.put(
  "/favourite-products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkFavouriteProductDataValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyerController.
);
router.use("/favourite-products", NotAllowedMethodHandler);

router.get(
  "/:buyerId/favourite-products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccess,
  buyerController.
);
router.use("/:buyerId/favourite-products", NotAllowedMethodHandler);

router.post(
  "/favourite-products/product",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkProductIdValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyerController. 
);
router.use("/favourite-products/product", NotAllowedMethodHandler);

router.delete(
  "/favourite-products/product/:productId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkProductIdValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyerController.
);
router.use("/favourite-products/product/:productId", NotAllowedMethodHandler);

router.get("/orders",
checkTokenAppearance,
convertAccessTokenToUserPayload,
addUserIdFromRequestHeaderToRequestParams,
buyerController.);
router.use("/orders", NotAllowedMethodHandler);

router.get("/:buyerId/orders",checkTokenAppearance,
convertAccessTokenToUserPayload,
checkAccess,
buyerController.);
router.use("/:buyerId/orders", NotAllowedMethodHandler);

router.get("/reviews",
checkTokenAppearance,
convertAccessTokenToUserPayload,
addUserIdFromRequestHeaderToRequestParams,
buyerController.);
router.use("/reviews", NotAllowedMethodHandler);

router.get("/:buyerId/reviews",checkTokenAppearance,
convertAccessTokenToUserPayload,
checkAccess,
buyerController.);
router.use("/:buyerId/reviews", NotAllowedMethodHandler);

router.get("/shopping-cart",
checkTokenAppearance,
convertAccessTokenToUserPayload,
addUserIdFromRequestHeaderToRequestParams,
buyerController.);
router.put("/shopping-cart",
checkTokenAppearance,
convertAccessTokenToUserPayload,
checkShoppingCartDataValidation,
addUserIdFromRequestHeaderToRequestParams,
buyerController.);
router.use("/shopping-cart", NotAllowedMethodHandler);

router.post("/shopping-cart/item",
checkTokenAppearance,
convertAccessTokenToUserPayload,
checkCartItemDataValidation,
addUserIdFromRequestHeaderToRequestParams,
buyerController.);
router.use("/shopping-cart/item", NotAllowedMethodHandler);

router.patch("/shopping-cart/item/:itemId",
checkTokenAppearance,
convertAccessTokenToUserPayload,
checkPartialCartItemDataValidation,
addUserIdFromRequestHeaderToRequestParams,
buyerController.);
router.delete("/shopping-cart/item/:itemId");
router.use("/shopping-cart/item/:itemId", NotAllowedMethodHandler);

//---------------------------//

router.use(URLNotExistHandler);

export default router;
