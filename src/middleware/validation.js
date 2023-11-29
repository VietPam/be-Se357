import { response } from "express";
//-----Common-----//
import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "../common/errors.js";
import { isCartItem, isValidCart } from "../helper/check_some_cart.js";
import { USER_ROLE } from "../common/userRoles.js";

//-----Util-----//
import { isDateValid } from "../util/check_date_validation.js";
import { isEmailValid } from "../util/check_email_validation.js";
import { isStringArray } from "../util/check_string_array_validation.js";
import { isValidPropertiesObject } from "../util/check_valid_properties_validation.js";
import { isBase64 } from "../util/check_base64_validation.js";

const MISSING_TOKEN = "Missing token";
const MISSING_PARAMETERS = "Missing some parameters";
const INVALID_PARAMETERS = "Some parameter is invalid";
const INVALID_ACCESS_RIGHT = "User do not have access right";



export const checkTokenAppearance = (request, response, next) => {
  const token = request.headers["authorization"];
  if (!token) {
    const error = new UnauthorizedError(MISSING_TOKEN);
    return next(error);
  }
  return next();
};

export const checkLoginValidation = (request, response, next) => {
  if (!request.body.data.email || !request.body.data.password) {
    const error = new BadRequestError(MISSING_PARAMETERS);
    return next(error);
  }
  if (
    !isEmailValid(request.body.data.email) ||
    typeof request.body.data.password !== "string"
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkUserValidation = (request, response, next) => {
  if (
    !isEmailValid(request.body.data.email) ||
    !(typeof request.body.data.password === "string") ||
    !(typeof request.body.data.name === "string")
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkProtectedPartialBuyerDataValidation = (
  request,
  response,
  next
) => {
  const propertiesToKeep = [
    "password",
    "name",
    "birthday",
    "gender",
    "phones",
    "addresses",
    "avatar",
  ];
  if (
    !isValidPropertiesObject(request.body.data, propertiesToKeep) ||
    (request.body.data.hasOwnProperty("password") &&
      !(typeof request.body.data.password === "string")) ||
    (!(typeof request.body.data.name === "string") &&
      request.body.data.hasOwnProperty("name")) ||
    (!isDateValid(request.body.data.birthday) &&
      request.body.data.hasOwnProperty("birthday")) ||
    (!(typeof request.body.data.gender === "string") &&
      request.body.data.gender) ||
    (!isStringArray(request.body.data.addresses) &&
      request.body.data.hasOwnProperty("addresses")) ||
    (!isStringArray(request.body.data.phones) &&
      request.body.data.hasOwnProperty("phones")) ||
    (!isBase64(request.body.data.avatar) &&
      request.body.data.hasOwnProperty("avatar"))
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  next();
};

export const checkPartialBuyerDataValidation = (request, response, next) => {
  const propertiesToKeep = [
    "password",
    "name",
    "avatar",
    "birthday",
    "gender",
    "phones",
    "addresses",
    "isActive",
  ];
  if (
    !isValidPropertiesObject(request.body.data, propertiesToKeep) ||
    (request.body.data.hasOwnProperty("password") &&
      !(typeof request.body.data.password === "string")) ||
    (!(typeof request.body.data.name === "string") &&
      request.body.data.hasOwnProperty("name")) ||
    (!isDateValid(request.body.data.birthday) &&
      request.body.data.hasOwnProperty("birthday")) ||
    (!(typeof request.body.data.gender === "string") &&
      request.body.data.gender) ||
    (!isStringArray(request.body.data.addresses) &&
      request.body.data.hasOwnProperty("addresses")) ||
    (!isStringArray(request.body.data.phones) &&
      request.body.data.hasOwnProperty("phones")) ||
    (!(typeof request.body.data.isActive === "boolean") &&
      request.body.data.hasOwnProperty("isActive")) ||
    (!isBase64(request.body.data.avatar) &&
      request.body.data.hasOwnProperty("avatar"))
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  next();
};

export const checkAccessRight = (request, response, next) => {
  const userPayload = JSON.parse(request.headers["authorization"]);
  if (
    userPayload.id != request.params.buyerId &&
    userPayload.id != request.params.sellerId &&
    userPayload.role != USER_ROLE.ADMIN
  ) {
    const error = new ForbiddenError(INVALID_ACCESS_RIGHT);
    return next(error);
  }
  next();
};

export const checkAdminRight = (request, response, next) => {
  const userPayload = JSON.parse(request.headers["authorization"]);
  if (userPayload.role != USER_ROLE.ADMIN) {
    const error = new ForbiddenError(INVALID_ACCESS_RIGHT);
    return next(error);
  }
  next();
};

export const checkFavouriteProductsDataValidation = (
  request,
  response,
  next
) => {
  const propertiesToKeep = ["favouriteProducts"];
  if (
    (request.body.data.hasOwnProperty("favouriteProducts") &&
      !isStringArray(request.body.data.favouriteProducts)) ||
    !isValidPropertiesObject(request.body.data, propertiesToKeep)
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkFollowingSellersDataValidation = (
  request,
  response,
  next
) => {
  const propertiesToKeep = ["followingSellers"];
  if (
    (request.body.data.hasOwnProperty("followingSellers") &&
      !isStringArray(request.body.data.followingSellers)) ||
    !isValidPropertiesObject(request.body.data, propertiesToKeep)
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkProductIdValidation = (request, response, next) => {
  const propertiesToKeep = ["productId"];
  if (
    (request.body.data.hasOwnProperty("productId") &&
      !(typeof request.body.data.productId === "string")) ||
    !isValidPropertiesObject(request.body.data, propertiesToKeep)
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkCartItemDataValidation = (request, response, next) => {
  const propertiesToKeep = ["quantity", "productId"];
  if (
    (request.body.data.hasOwnProperty("cartItem") &&
      !isCartItem(request.body.data)) ||
    !isValidPropertiesObject(request.body.data, propertiesToKeep)
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkShoppingCartDataValidation = (request, response, next) => {
  const propertiesToKeep = ["shoppingCart"];
  if (
    (request.body.data.hasOwnProperty("shoppingCart") &&
      !isValidCart(request.body.data.shoppingCart)) ||
    !isValidPropertiesObject(request.body.data, propertiesToKeep)
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkPartialCartItemDataValidation = (request, response, next) => {
  const propertiesToKeep = ["quantity"];
  if (
    (request.body.data.hasOwnProperty("quantity") &&
      !(
        Number.isInteger(request.body.data.quantity) &&
        request.body.data.quantity > 0
      )) ||
    !isValidPropertiesObject(request.body.data, propertiesToKeep)
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};

export const checkPartialSellerDataValidation = (request, response, next) => {
  const propertiesToKeep = [
    "password",
    "name",
    "avatar",
    "bio",
    "phones",
    "addresses",
    "isActive",
  ];
  if (
    !isValidPropertiesObject(request.body.data, propertiesToKeep) ||
    (request.body.data.hasOwnProperty("password") &&
      !(typeof request.body.data.password === "string")) ||
    (!(typeof request.body.data.name === "string") &&
      request.body.data.hasOwnProperty("name")) ||
    (!isDateValid(request.body.data.birthday) &&
      request.body.data.hasOwnProperty("bio")) ||
    (!(typeof request.body.data.gender === "string") &&
      request.body.data.gender) ||
    (!isStringArray(request.body.data.addresses) &&
      request.body.data.hasOwnProperty("addresses")) ||
    (!isStringArray(request.body.data.phones) &&
      request.body.data.hasOwnProperty("phones")) ||
    (!(typeof request.body.data.isActive === "boolean") &&
      request.body.data.hasOwnProperty("isActive")) ||
    (!isBase64(request.body.data.avatar) &&
      request.body.data.hasOwnProperty("avatar"))
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  next();
};


export const checkProtectedPartialSellerDataValidation = (request, response, next) => {
  const propertiesToKeep = [
    "password",
    "name",
    "avatar",
    "bio",
    "phones",
    "addresses",
  ];
  if (
    !isValidPropertiesObject(request.body.data, propertiesToKeep) ||
    (request.body.data.hasOwnProperty("password") &&
      !(typeof request.body.data.password === "string")) ||
    (!(typeof request.body.data.name === "string") &&
      request.body.data.hasOwnProperty("name")) ||
    (!isDateValid(request.body.data.birthday) &&
      request.body.data.hasOwnProperty("bio")) ||
    (!(typeof request.body.data.gender === "string") &&
      request.body.data.gender) ||
    (!isStringArray(request.body.data.addresses) &&
      request.body.data.hasOwnProperty("addresses")) ||
    (!isStringArray(request.body.data.phones) &&
      request.body.data.hasOwnProperty("phones")) ||
    (!isBase64(request.body.data.avatar) &&
      request.body.data.hasOwnProperty("avatar"))
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  next();
};
