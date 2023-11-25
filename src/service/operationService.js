import { PrismaClient } from "@prisma/client";
import { BuyerDAO } from "../model/private/DAO/buyerDAO.js";
import { SellerDAO } from "../model/private/DAO/sellerDAO.js";
import { AdminDAO } from "../model/private/DAO/adminDAO.js";
import { NotFoundError, UnauthorizedError } from "../common/errors.js";
import { comparePasswords } from "../helper/working_with_password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/generate_tokens.js";
import Cache from "../config/connect_redis.js";

const USER_IS_NOT_FOUND = "The user is not found";
const WRONG_PASSWORD = "Wrong password";
const ACCESS_TOKEN_EXPIRATION_IN_SECONDS = 10 * 60;
const REFRESH_TOKEN_EXPIRATION_IN_SECONDS = 30 * 24 * 60 * 60;
//public
async function getCredentialByEmailAndPassword(email, password) {
  try {
    const DBconnection = new PrismaClient();
    const [user] = await DBconnection.$transaction([
      DBconnection.$queryRaw`SELECT "id", "password" from  public."Admin" where email = ${email} Union SELECT "id", "password" from  public."Buyer" where email = ${email} Union SELECT "id", "password" from  public."Seller" where email = ${email} `,
    ]);
    if (user) {
      console.log(user)
      if (await comparePasswords(password, user[0].password)) {
        //create credential
        console.log("password: ",user[0].password);
        console.log("id: ",user[0].id)
        await removeCredentialInCacheByUserID(user[0].id);
        return await getCredentialByUserID(user[0].id);
      } else {
        const error = new UnauthorizedError(WRONG_PASSWORD);
        throw error;
      }
    } else {
      const error = new NotFoundError(USER_IS_NOT_FOUND);
      throw error;
    }
  } catch (e) {
    throw e;
  }
}

/**
 * WARNING: ONLY use this with valid userID
 * @param {string} userID 
 * @returns 
 */
async function getCredentialByUserID(userID) {
  try {
    const accessToken = generateAccessToken(userID);
    const refreshToken = generateRefreshToken(userID);
    await storeTokensToCache(userID, accessToken, refreshToken);
    return { accessToken, refreshToken };
  } catch (e) {
    throw e;
  }
}

async function removeCredentialInCacheByUserID(userID) {
  try {
    await Cache.del([`${userID}:accessToken`, `${userID}:refreshToken`]);
  } catch (e) {
    throw e;
  }
}

/**
 * WARNING: ONLY use this with valid userID
 * @param {string} userID 
 * @returns 
 */
async function generateNewAccessToken(userID) 
{
  try {
    const accessToken = generateAccessToken(userID);
    await storeAccessTokenToCache(userID, accessToken);
    return accessToken
  } catch (e) {
    throw e;
  }
}

//private
async function storeAccessTokenToCache(userID,accessToken)
{
  try {
    await Cache.setEx(
      `${userID}:accessToken`,
      ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
      accessToken
    );
  } catch (e) {
    throw e;
  }
}

async function storeTokensToCache(userID, accessToken, refreshToken) {
  try {
    await Cache.setEx(
      `${userID}:accessToken`,
      ACCESS_TOKEN_EXPIRATION_IN_SECONDS,
      accessToken
    );
    await Cache.setEx(
      `${userID}:refreshToken`,
      REFRESH_TOKEN_EXPIRATION_IN_SECONDS,
      refreshToken
    );
  } catch (e) {
    throw e;
  }
}

export default {
  getCredentialByEmailAndPassword,
  removeCredentialInCacheByUserID,
  generateNewAccessToken,
  getCredentialByUserID,
};
