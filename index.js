//-----App-----//
import express from "express";

//-----config-----//
import cache from "./src/config/connect_redis.js";

//-----Internal modules-----//
import { existsSync } from "fs";
import path from "path";

//-----Util-----//
import { generateKeyPairAndSave } from "./src/util/generate-keypair.js";

//-----Common-----//
import {
  ACCESS_TOKEN_KEYS_FOLDER_PATH,
  REFRESH_TOKEN_KEYS_FOLDER_PATH,
} from "./src/config/config_tokens.js";

//-----Middleware-----//
import { errorHandler } from "./src/middleware/errorHandler.js";

//-----Router-----//
import { wrapTheApp } from "./src/router/index.js";

//-----Env-----//
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3009;
const app = express();

wrapTheApp(app);

const MODULUS_LENGTH = 2048;

async function startServer() {
  try {
    if (
      !existsSync(path.join(REFRESH_TOKEN_KEYS_FOLDER_PATH, "key.pem")) ||
      !existsSync(path.join(REFRESH_TOKEN_KEYS_FOLDER_PATH, "key.pem.pub"))
    ) {
      console.log("Creating refresh token keys pair...");
      await generateKeyPairAndSave(REFRESH_TOKEN_KEYS_FOLDER_PATH, MODULUS_LENGTH);
      console.log("Refresh token keys pair created successfully!");
    }
    if (
      !existsSync(path.join(ACCESS_TOKEN_KEYS_FOLDER_PATH, "key.pem")) ||
      !existsSync(path.join(ACCESS_TOKEN_KEYS_FOLDER_PATH, "key.pem.pub"))
    ) {
      console.log("Creating access token keys pair...");
      generateKeyPairAndSave(ACCESS_TOKEN_KEYS_FOLDER_PATH, MODULUS_LENGTH);
      console.log("Access token keys pair created successfully!");
    }
    await cache.connect();
    await cache.ping().then((res) => console.log(res));
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("We gonna close this server", error);
    await cache.flushAll();
    await cache.disconnect();
    process.exit(1);
  }
}

startServer();
