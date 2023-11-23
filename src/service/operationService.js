import { PrismaClient } from "@prisma/client";
import { BuyerDAO } from "../model/private/DAO/buyerDAO.js";
import { SellerDAO } from "../model/private/DAO/sellerDAO.js";
import { AdminDAO } from "../model/private/DAO/adminDAO.js";
import { NotFoundError, UnauthorizedError } from "../common/errors.js";
import { comparePasswords } from "../helper/working_with_password.js";
import {generateAccessToken,generateRefreshToken} from "../helper/generate_tokens.js";
import Cache from "../config/connect_redis.js";

const USER_IS_NOT_FOUND = "The user is not found";
const WRONG_PASSWORD = "Wrong password";
const ACCESS_TOKEN_EXPIRATION_IN_SECONDS = 10 * 60;
const REFRESH_TOKEN_EXPIRATION_IN_SECONDS = 30 * 24 * 60 * 60;
//public
async function getCredential(email, password) {
  try {
    const DBconnection = new PrismaClient();
    const [user] = await DBconnection.$transaction([
      DBconnection.$queryRaw`SELECT "id", "password" from  ADMIN where email = ${email} Union SELECT "id", "password" from  BUYER where email = ${email} Union SELECT "id", "password" from  SELLER where email = ${email} `,
    ]);
    if (user) {
      if (await comparePasswords(password, user.password)) {
        //create credential
        const accessToken = generateAccessToken(user.id);
        const refreshToken =generateAccessToken(user.id);
        await storeTokensToCache(user.id,accessToken,refreshToken);
        return {accessToken,refreshToken};
      } else {
        const error = new UnauthorizedError(WRONG_PASSWORD);
      }
    } else {
      const error = new NotFoundError(USER_IS_NOT_FOUND);
      throw error;
    }
  } catch (e) {
    throw e;
  }
}
function removeCredentialByUserID(userID) {}
function generateNewAccessToken(userID) {}

//private
async function storeTokensToCache(userID, accessToken,refreshToken) {
  try
  {
    await Cache.setEx(`${userID}:accessToken`,ACCESS_TOKEN_EXPIRATION_IN_SECONDS,accessToken);
    await Cache.setEx(`${userID}:accessToken`,REFRESH_TOKEN_EXPIRATION_IN_SECONDS,refreshToken);  
  }
  catch(e)
  {
    throw e;
  }
}

export default  {
  getCredential,
  removeCredentialByUserID,
  generateNewAccessToken,
};

