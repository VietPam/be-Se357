import express from "express";
const router = express.Router();

import {
  checkLoginValidation,
  checkTokenAppearance,
  checkUserValidation,
  checkAccessRight,
  checkPartialSellerDataValidation,
  checkProtectedPartialBuyerDataValidation,
  checkAdminRight,
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

import sellersController from "../../controller/sellersController.js";

/**
 * return all except password, orders,products
 */

router.get(
  "/protected",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  sellersController.getProtectedSellerDataByID
);
router.patch(
  "/protected",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkProtectedPartialBuyerDataValidation,
  standarlizeBirthday,
  addUserIdFromRequestHeaderToRequestParams,
  sellersController.updateSeller
);
router.use("/protected", NotAllowedMethodHandler);

router.post(
  "/",
  checkUserValidation,
  standarlizeBirthday,
  sellersController.createNewSeller
);
router.use("/", NotAllowedMethodHandler);

router.get(
  "/:sellerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAdminRight,
  sellersController.getSellerByID
);
router.patch(
  "/:sellerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialSellerDataValidation,
  standarlizeBirthday,
  checkAdminRight,
  sellersController.updateSeller
);
router.use("/:sellerId", NotAllowedMethodHandler);

router.get("/:sellerId/public", sellersController.getPublicSellerDataByID);
router.use("/:sellerId/public", NotAllowedMethodHandler);

router.get(
  "/:sellerId/public/products",
  sellersController.getPublishedProducts
);
router.use("/:sellerId/public/products", NotAllowedMethodHandler);

router.get(
  "/orders",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  sellersController.getOrders
);
router.use("/orders", NotAllowedMethodHandler);

router.get(
  "/:sellerId/orders",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccessRight,
  sellersController.getOrders
);
router.use("/:sellerId/orders", NotAllowedMethodHandler);

//---------------------------//

router.use(URLNotExistHandler);

export default router;
