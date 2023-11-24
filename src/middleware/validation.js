//-----Common-----//
import { UnauthorizedError, BadRequestError } from "../common/errors.js";

//-----Util-----//
import { isDateValid } from "../util/check_date_validation.js";
import { isEmailValid } from "../util/check_email_validation.js";

const MISSING_TOKEN = "Missing token";
const MISSING_PARAMETERS = "Missing some parameters";
const INVALID_PARAMETERS = "Some parameter is invalid";

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
    !request.body.data.email ||
    !request.body.data.password ||
    !request.body.data.name ||
    !request.body.data.birthday
  ) {
    const error = new BadRequestError(MISSING_PARAMETERS);
    return next(error);
  }
  if (
    !isEmailValid(request.body.data.email) ||
    !(typeof request.body.data.password === "string") ||
    !(typeof request.body.data.name === "string") ||
    !isDateValid(request.body.data.birthday)
  ) {
    const error = new BadRequestError(INVALID_PARAMETERS);
    return next(error);
  }
  return next();
};
