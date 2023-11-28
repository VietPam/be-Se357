import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
//-----Common-----//
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "../common/errors.js";


//-----Config-----//
import cache from "../config/connect_redis.js";
import {ACCESS_TOKEN_KEYS_FOLDER_PATH,REFRESH_TOKEN_KEYS_FOLDER_PATH} from "../config/config_tokens.js"

//-----Helper-----//
import { standardlizeDay } from "../helper/standardlize_data.js";

const EXPIRED_TOKEN = "Expired token";
const NOT_LEGITIMATE_TOKEN = "Token is not legit";

export const standarlizeBirthday = (request, response, next) => {
  if (request.body.data.birthday) {
    try {
      request.body.data.birthday = standardlizeDay(request.body.data.birthday);
    } catch (e) {
      const error = new BadRequestError(e.message);
      throw error;
    }
  }
  return next();
};

export const convertAccessTokenToUserPayload = async (
  request,
  response,
  next
) => {
  const token = request.headers["authorization"];
  const key = fs.readFileSync(
    path.join(ACCESS_TOKEN_KEYS_FOLDER_PATH, "key.pem.pub"),
    "utf8"
  );

  jwt.verify(token, key, { algorithms: ["RS256"] }, async (err, decoded) => {
    if (err) {
      console.error("Err:", err.message);
      const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
      return next(error);
    } else if (token !== (await cache.get(`${decoded.id}:accessToken`))) {
      const error = new UnauthorizedError(EXPIRED_TOKEN);
      return next(error);
    } else {
      request.headers["authorization"] = JSON.stringify(decoded);
      return next();
    }
  });
};

export const convertRefreshTokenToUserPayload = async (
  request,
  response,
  next
) => {
  const token = request.headers["authorization"];
  const key = fs.readFileSync(
    path.join(REFRESH_TOKEN_KEYS_FOLDER_PATH, "key.pem.pub"),
    "utf8"
  );

  jwt.verify(token, key, { algorithms: ["RS256"] }, async (err, decoded) => {
    if (err) {
      console.error(err);
      const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
      return next(error);
    } else if (token !== (await cache.get(`${decoded.id}:refreshToken`))) {
      const error = new UnauthorizedError(EXPIRED_TOKEN);
      return next(error);
    } else {
      request.headers["authorization"] =JSON.stringify(decoded);
      return next();
    }
  });
};
