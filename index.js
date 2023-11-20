//-----App-----//
import express from "express";

//-----config-----//
import redisClient from "./src/config/connect_redis";

//-----Internal modules-----//
import { existsSync } from "fs";
import path from "path";

//-----Util-----//
import { generateKeyPairAndSave } from "./src/util/generate-keypair";

//-----Common-----//
import {
  accessTokenKeysFolderPath,
  refreshTokenKeysFolderPath,
} from "./src/common/tokenKeysFolderPaths";

//-----Env-----//
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3009;
const app = express();

async function startServer() {
  try {
    if (
      !existsSync(path.join(refreshTokenKeysFolderPath, "key.pem")) ||
      !existsSync(path.join(refreshTokenKeysFolderPath, "key.pem.pub"))
    ) {
      console.log("Creating refresh token keys pair...");
      generateKeyPairAndSave(refreshTokenKeysFolderPath);
      console.log("Refresh token keys pair created successfully!");
    }
    if (
      !existsSync(path.join(accessTokenKeysFolderPath, "key.pem")) ||
      !existsSync(path.join(accessTokenKeysFolderPath, "key.pem.pub"))
    ) {
      console.log("Creating access token keys pair...");
      generateKeyPairAndSave(accessTokenKeysFolderPath);
      console.log("Access token keys pair created successfully!");
    }
    await redisClient.connect();
    await redisClient.ping().then((res) => console.log(res));
    app.listen(port, () => {
      console.log(`Server is ready to use`);
    });
  } catch (error) {
    console.error("We gonna close this server", error);
    await redisClient.flushAll();
    await redisClient.disconnect();
    process.exit(1);
  }
}

startServer();