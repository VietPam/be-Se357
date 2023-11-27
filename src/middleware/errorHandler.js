//-----common-----//
import { NotAllowedMethodError, NotFoundError } from "../common/errors.js";

const NOT_FOUND_URL = "URL is not found";
const NOT_ALLOWED_METHOD = "This method is not allowed";

export const NotAllowedMethodHandler = (request, response, next) => {
  const error = new NotAllowedMethodError(NOT_ALLOWED_METHOD);
  return next(error);
}

export const URLNotExistHandler = (request, response, next) => {
  const error = new NotFoundError(NOT_FOUND_URL);
  return next(error);
}

export function errorHandler(error, request, response, next) {
  const statusCode = error.status || 500;
  return response.status(statusCode).json({
    message: error.message
  })
}
