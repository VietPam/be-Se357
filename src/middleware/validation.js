import jwt from "jsonwebtoken";

//-----Common-----//
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "../common/errors";
import {
  refreshTokenKeysFolderPath,
  accessTokenKeysFolderPath,
} from "../common/tokenKeysFolderPaths";

//-----Config-----//
import cache from "../config/connect_redis";

//-----Build_In-----//
import path from "path";
import fs from "fs";

//-----Utils-----//
import { isEmailValid } from "../util/check_email_validation";
import { isDateValid } from "../util/check_date_validation";

const MISSING_TOKEN = "Token missing";
const EXPIRED_TOKEN = "Expired token";
const MISSING_OR_INVALID_PARAMETER = "parameters is missing or invalid";
const NOT_LEGITIMATE_TOKEN = "Token is not legit";


export const checkTokenExistence=(request, response, next)=>{
  const token = request.headers["authorization"];
  if (!token) {
    const error = new UnauthorizedError(MISSING_TOKEN);
    return next(error);
  }
  next();
}
