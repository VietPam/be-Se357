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

//-----Utils-----//
import { isEmailValid } from "../util/check_email_validation";
import { isDateValid } from "../util/check_date_validation";

const EXPIRED_TOKEN = "Expired token";
const NOT_LEGITIMATE_TOKEN = "Token is not legit";


export const standarlizeUserData = (request, response, next) => {
  request.body.data.birthday = new Date(
    request.body.data.birthday
  ).toISOString();
  return next();
};

export const convertAccessTokenToUserID = async (request, response, next) => {
    const token = request.headers["authorization"];
    const key = fs.readFileSync(
      path.join(accessTokenKeysFolderPath, "key.key.pub"),
      "utf8"
    );
  
    jwt.verify(token, key, { algorithms: ["RS256"] }, async (err, decoded) => {
      if (err) {
        console.error("Err:", err.message);
        const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
        return next(error);
      } else if (token !== (await cache.get(`${decoded}:accessToken`))) {
        const error = new UnauthorizedError(EXPIRED_TOKEN);
        return next(error);
      } else {
        request.headers["authorization"] = decoded;
        return next();
      }
    });
  };
  
  export const convertRefreshTokenToUserID = async (request, response, next) => {
    const token = request.headers["authorization"];
    const key = fs.readFileSync(
      path.join(refreshTokenKeysFolderPath, "key.key.pub"),
      "utf8"
    );
  
    jwt.verify(token, key, { algorithms: ["RS256"] }, async (err, decoded) => {
      if (err) {
        console.error(err);
        const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
        return next(error);
      } else if (token !== (await cache.get(`${decoded}:refreshToken`))) {
        const error = new UnauthorizedError(EXPIRED_TOKEN);
        return next(error);
      } else {
        request.headers["authorization"] = decoded;
        return next();
      }
    });
  };
  