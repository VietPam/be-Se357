import jwt from "jsonwebtoken";

//-----internal module-----//
import fs from "fs";
import path from "path";

//-----Common-----//
import {accessTokenKeysFolderPath,refreshTokenKeysFolderPath} from "../common/tokenKeysFolderPaths"

const generateAccessToken = (uid, role) => {
  try {
    const payload = {
      _id: uid,
      role: role,
    };
    const key = fs.readFileSync(
      path.join(accessTokenKeysFolderPath, "key.key"),
      "utf8"
    );
    console.log("AccessToken private key: ", key);
    console.log("type of AccessToken private key: ", typeof key);
    const accessToken = jwt.sign(payload, key, { algorithm: "RS256" });
    return accessToken;
  } catch (e) {
    throw e;
  }
};

const generateRefreshToken = (uid, role) => {
  try {
    const payload = {
      _id: uid,
      role: role,
    };
    const key = fs.readFileSync(
      path.join(refreshTokenKeysFolderPath, "key.key"),
      "utf8"
    );
    const refreshToken = jwt.sign(payload, key, { algorithm: "RS256" });
    return refreshToken;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
