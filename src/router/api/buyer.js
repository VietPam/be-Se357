import express from "express";
const router = express.Router();

//-----Middleware-----//
import {
  checkTokenAppearance,
  checkUserValidation,
  checkProtectedPartialBuyerDataValidation,
  checkAccessRight,
  checkAdminRight,
  checkPartialBuyerDataValidation,
  checkFavouriteProductsDataValidation,
  checkFollowingSellersDataValidation,
  checkProductIdValidation,
  checkCartItemDataValidation,
  checkShoppingCartDataValidation,
  checkPartialCartItemDataValidation,
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
  "/protected",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.getProtectedBuyerDataByID
);
router.use("/protected", NotAllowedMethodHandler);
router.post(
  "/protected",
  checkUserValidation,
  checkProtectedPartialBuyerDataValidation,
  standarlizeBirthday,
  buyersController.createNewBuyer
);
router.patch(
  "/protected",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkProtectedPartialBuyerDataValidation,
  standarlizeBirthday,
  addUserIdFromRequestHeaderToRequestParams,
  buyersController.updateBuyer
);
router.use("/protected", NotAllowedMethodHandler);

router.get(
  "/:buyerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAdminRight,
  buyersController.getBuyerByID
);
router.patch(
  "/:buyerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialBuyerDataValidation,
  standarlizeBirthday,
  checkAdminRight,
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

// router.get(
//   "/following-sellers",
//   checkTokenAppearance,
//   convertAccessTokenToUserPayload,
//   addUserIdFromRequestHeaderToRequestParams,
//   buyersController.getFollowingSellers
// );
// router.put(
//   "/following-sellers",
//   checkTokenAppearance,
//   convertAccessTokenToUserPayload,
//   checkSellerIdValidation,
//   addUserIdFromRequestHeaderToRequestParams,
//   buyersController.setFollowingSellers
// );
// router.use("/following-sellers", NotAllowedMethodHandler);

// router.post(
//   "/following-sellers/seller",
//   checkTokenAppearance,
//   convertAccessTokenToUserPayload,
//   checkSellerIdValidation,
//   addUserIdFromRequestHeaderToRequestParams,
//   buyersController.followSeller
// );
// router.use("/following-sellers/seller", NotAllowedMethodHandler);

// router.delete(
//   "/following-sellers/seller/:sellerId",
//   checkTokenAppearance,
//   convertAccessTokenToUserPayload,
//   checkSellerIdValidation,
//   addUserIdFromRequestHeaderToRequestParams,
//   buyersController.deleteFollowingSeller
// );
// router.use("/following-sellers/seller/:sellerId", NotAllowedMethodHandler);

router.get(
  "/:buyerId/favourite-products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccessRight,
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
  checkAccessRight,
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
