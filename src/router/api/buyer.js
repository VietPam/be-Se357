import express from "express";
const router = express.Router();

//-----Middleware-----//
import {
  checkTokenAppearance,
  checkUserValidation,
  checkPartialBuyerDataValidation,
  checkAccess,
} from "../../middleware/validation.js";
import {
  convertAccessTokenToUserPayload,
  standarlizeBirthday,
  addUserIdFromRequestHeaderToRequestParams,
} from "../../middleware/modification.js";
import {
  NotAllowedMethodHandler,
  URLNotExistHandler,
} from "../../middleware/errorHandler.js";

//-----Service-----//
import buyersController from "../../controller/buyersController.js";

router.get(
  "/public",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getPublicBuyerDataByID
);
router.use("/public", NotAllowedMethodHandler);

router.get(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getBuyerByID
);
router.post(
  "/",
  checkUserValidation,
  standarlizeBirthday,
  buyersController.createNewBuyer
);
router.patch(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialBuyerDataValidation,
  standarlizeBirthday,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.updateBuyer
);
router.use("/", NotAllowedMethodHandler);

router.get(
  "/:buyerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  standarlizeBirthday,
  checkAccess,
  buyersController.getBuyerByID
);
router.patch(
  "/:buyerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialBuyerDataValidation,
  standarlizeBirthday,
  checkAccess,
  buyersController.updateBuyer
);
router.use("/:buyerId", NotAllowedMethodHandler);

router.get(
  "/favourite-products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getFavouriteProducts
);
router.put(
  "/favourite-products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkFavouriteProductsDataValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.setFavouriteProducts
);
router.use("/favourite-products", NotAllowedMethodHandler);

router.get(
  "/following-sellers",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getFollowingSellers
);
router.put(
  "/following-sellers",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkFollowingSellersDataValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.setFollowingSellers
);
router.use("/following-sellers", NotAllowedMethodHandler);

router.post("/following-sellers/seller");
router.use("/following-sellers/seller", NotAllowedMethodHandler);

router.get(
  "/:buyerId/favourite-products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccess,
  buyersController.getFavouriteProducts
);
router.use("/:buyerId/favourite-products", NotAllowedMethodHandler);

router.post(
  "/favourite-products/product",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkProductIdValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.addProductToFavouriteProducts
);
router.use("/favourite-products/product", NotAllowedMethodHandler);

router.delete(
  "/favourite-products/product/:productId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkProductIdValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.deleteProductFromFavouriteProducts
);
router.use("/favourite-products/product/:productId", NotAllowedMethodHandler);

router.get(
  "/orders",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getOrders
);
router.use("/orders", NotAllowedMethodHandler);

router.get(
  "/:buyerId/orders",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccess,
  buyersController.getOrders
);
router.use("/:buyerId/orders", NotAllowedMethodHandler);

router.get(
  "/reviews",
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getReviews
);
router.use("/reviews", NotAllowedMethodHandler);

router.get("/:buyerId/reviews", buyersController.getReviews);
router.use("/:buyerId/reviews", NotAllowedMethodHandler);

router.get(
  "/shopping-cart",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getCart
);
router.put(
  "/shopping-cart",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkShoppingCartDataValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.setCart
);
router.use("/shopping-cart", NotAllowedMethodHandler);

router.post(
  "/shopping-cart/item",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkCartItemDataValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.addItemToCart
);
router.use("/shopping-cart/item", NotAllowedMethodHandler);

router.patch(
  "/shopping-cart/item/:itemId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialCartItemDataValidation,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.updateItemInCart
);
router.delete(
  "/shopping-cart/item/:itemId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.deleteItemInCart
);
router.use("/shopping-cart/item/:itemId", NotAllowedMethodHandler);

//---------------------------//

router.use(URLNotExistHandler);

export default router;
