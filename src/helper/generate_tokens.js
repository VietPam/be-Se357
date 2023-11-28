import jwt from "jsonwebtoken";

//-----internal module-----//
import fs from "fs";
import path from "path";

//-----Config-----//
import {
  ACCESS_TOKEN_KEYS_FOLDER_PATH,
  REFRESH_TOKEN_KEYS_FOLDER_PATH,
  ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
  REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
} from "../config/config_tokens.js";


export const generateAccessToken = (userID, userRole) => {
  try {
    console.log(userID);
    const payload = { id: userID, role: userRole };
    console.log(payload);
    const key = fs.readFileSync(
      path.join(ACCESS_TOKEN_KEYS_FOLDER_PATH, "key.pem"),
      "utf8"
    );
    const accessToken = jwt.sign(payload, key, {
      algorithm: "RS256",
      expiresIn: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
    });
    return accessToken;
  } catch (e) {
    throw e;
  }
};

export const generateRefreshToken = (userID, userRole) => {
  try {
    const payload = { id: userID, role: userRole };
    const key = fs.readFileSync(
      path.join(REFRESH_TOKEN_KEYS_FOLDER_PATH, "key.pem"),
      "utf8"
    );
    const refreshToken = jwt.sign(payload, key, {
      algorithm: "RS256",
      expiresIn: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
    });
    return refreshToken;
  } catch (e) {
    throw e;
  }
};
