import jwt from "jsonwebtoken";

//-----Common-----//
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../common/errors";
import { refreshTokenKeysFolderPath, accessTokenKeysFolderPath } from "../common/tokenKeysFolderPaths";

//-----Config-----//
import cache from "../config/connect_redis";

//-----Build_In-----//
import path from "path";
import fs from "fs";

//-----Utils-----//
import { isEmailValid } from "../util/check_email_validation";
import { isDateValid } from "../util/check_date_validation";

const MISSING_ACCESS_TOKEN = "Access token missing";
const MISSING_REFRESH_TOKEN = "Refresh token missing";
const EXPIRED_TOKEN = "Expired token";
const MISSING_OR_INVALID_PARAMETER="parameters is missing or invalid";
const NOT_LEGITIMATE_TOKEN = "Token is not legit";

export const verifyAccessToken = async (request, response, next) => {
  const token = request.headers["authorization"];
  if (!token) {
    const error = new UnauthorizedError(MISSING_ACCESS_TOKEN);
    return next(error);
  }

  const key = fs.readFileSync(path.join(accessTokenKeysFolderPath, "key.key.pub"), "utf8");

  jwt.verify(token , key,{algorithms:["RS256"]} ,
  async (err, decoded) => {
    if (err) {
      console.error("Err:",err.message)
      const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
      return next(error)
    }
    else if (token === await cache.get(`${decoded}:accessToken`)) {
      request.body.userId = decoded;
      return next();
    }
    else {
      const error = new UnauthorizedError(EXPIRED_TOKEN);
      return next(error);
    }
  }
  );
};

export const verifyRefreshToken = async (request, response, next) => {
  const token = request.headers["authorization"];

  if (!token) {
    const error = new ForbiddenError(MISSING_REFRESH_TOKEN);
    return next(error);
  }

  const key = fs.readFileSync(path.join(refreshTokenKeysFolderPath, "key.key.pub"),"utf8");
  console.log(path.join(refreshTokenKeysFolderPath, "public_key.key.pub"))
  jwt.verify(token , key,{algorithms:["RS256"]}, async (err, decoded) => {
    if (err) {
      console.error(err)
      const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
      return next(error);
    }
    else if (token === await cache.get(`${decoded}:refreshToken`)) {
      request.body.userId = decoded;
      return next();
    }
    else {
      const error = new UnauthorizedError(EXPIRED_TOKEN);
      return next(error);
    }
  });
};

export const ValidateUser=(request, response, next)=>{
  if(!isEmailValid(request.body.data.email)||!(typeof request.body.data.password === 'string')||!(typeof request.body.data.role === 'string')||!(typeof request.body.data.name === 'string')||!( isDateValid(new Date(request.body.data.birthday))))
  {
    const error=new BadRequestError(MISSING_OR_INVALID_PARAMETER);
    next(error);
  }  
  request.body.data.birthday=(new Date(request.body.data.birthday)).toISOString();
  next();
}

export const checkEmailValidation= (request, response, next)=>{
  if(!isEmailValid(request.body.data.email))
  {
    const error=new BadRequestError(MISSING_OR_INVALID_PARAMETER);
    next(error);
  }
  next();
}