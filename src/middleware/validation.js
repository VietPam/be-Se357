import { response } from "express";
//-----Common-----//
import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "../common/errors.js";
import { USER_ROLE } from "../common/userRoles.js";

//-----Util-----//
import { isDateValid } from "../util/check_date_validation.js";
import { isEmailValid } from "../util/check_email_validation.js";
import { isStringArray } from "../util/check_string_array_validation.js";
import { isInvalidPropertiesObject } from "../util/check_has_invalid_properties_validation.js";

const MISSING_TOKEN = "Missing token";
const MISSING_PARAMETERS = "Missing some parameters";
const INVALID_PARAMETERS = "Some parameter is invalid";
const INVALID_ACCESS_RIGHT = "User do not have access right";

function isStringArray(arr) {
  if (!Array.isArray(arr)) {
    return false; // Not an array
  }
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string") {
      return false; // Element at index i is not a string
    }
  }
  return true; // All elements are strings
}

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

export const checkPartialBuyerDataValidation = (request, response, next) => {
  const propertiesToKeep = [
    "password",
    "name",
    "birthday",
    "gender",
    "phones",
    "addresses",
  ];
  if (
    isInvalidPropertiesObject(request.body.data) ||
    (request.body.data &&
      !(typeof request.body.data.password === "string") &&
      !(typeof request.body.data.name === "string") &&
      !isDateValid(request.body.data.birthday) &&
      !(typeof request.body.data.gender === "string") &&
      !isStringArray(request.body.data.addresses) &&
      !isStringArray(request.body.data.phones))
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
  if (request.body.data.favouriteProducts) {
  }
};
