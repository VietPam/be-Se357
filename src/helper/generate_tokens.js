import jwt from "jsonwebtoken";

//-----internal module-----//
import fs from "fs";
import path from "path";

//-----Common-----//
import {
  accessTokenKeysFolderPath,
  refreshTokenKeysFolderPath,
} from "../common/tokenKeysFolderPaths.js";

const ACCESS_TOKEN_EXPIRATION='30m';
const REFRESH_TOKEN_EXPIRATION='30d';

export const generateAccessToken = (userID,userRole) => {
  try {
    console.log(userID);
    const payload = {id:userID,role:userRole};
    console.log(payload)
    const key = fs.readFileSync(
      path.join(accessTokenKeysFolderPath, "key.pem"),
      "utf8"
    );
    const accessToken = jwt.sign(payload, key, { algorithm: "RS256",expiresIn:ACCESS_TOKEN_EXPIRATION });
    return accessToken;
  } 
  catch (e) {
    throw e;
  }
};

export const generateRefreshToken = (userID,userRole) => {
  try {
    const payload={id:userID,role:userRole};
    const key = fs.readFileSync(
      path.join(refreshTokenKeysFolderPath, "key.pem"),
      "utf8"
    );
    const refreshToken = jwt.sign(payload, key, { algorithm: "RS256",expiresIn:REFRESH_TOKEN_EXPIRATION });
    return refreshToken;
  } catch (e) {
    throw e;
  }
};

