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

import sellersController from "../../controller/sellersController.js";

/**
 * return all except password, orders,products
 */

router.get(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  sellersController.getSellerByID
);
router.post(
  "/",
  checkUserValidation,
  standarlizeBirthday,
  sellersController.createNewSeller
);
router.patch(
  "/",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialSellerDataValidation,
  standarlizeBirthday,
  addUserIdFromRequestHeaderToRequestParams,
  sellersController.updateSeller
);
router.use("/", NotAllowedMethodHandler);

router.get(
  "/:sellerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccess,
  sellersController.getSellerByID
);
router.patch(
  "/:sellerId",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkPartialSellerDataValidation,
  standarlizeBirthday,
  checkAccess,
  sellersController.updateSeller
);
router.use("/:sellerId", NotAllowedMethodHandler);

router.get("/:sellerId/public", sellersController.getPublicSellerDataByID);
router.use("/:sellerId/public", NotAllowedMethodHandler);

router.get("/:sellerId/public/products", sellersController.getPublishedProducts);
router.use("/:sellerId/public/products", NotAllowedMethodHandler);

router.get(
  "/products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  addUserIdFromRequestHeaderToRequestParams,
  sellersController.getProducts
);
router.use("/products", NotAllowedMethodHandler);

router.get(
  "/:sellerId/products",
  checkTokenAppearance,
  convertAccessTokenToUserPayload,
  checkAccess,
  sellersController.getProducts
);
router.use("/:sellerId/products", NotAllowedMethodHandler);

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
  checkAccess,
  sellersController.getOrders
);
router.use("/:sellerId/orders", NotAllowedMethodHandler);

//---------------------------//

router.use(URLNotExistHandler);

export default router;
