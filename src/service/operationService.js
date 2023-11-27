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
const USER_ROLE = { BUYER: "buyer", SELLER: "seller", ADMIN: "admin" };
//public
async function getCredentialByEmailAndPassword(email, password) {
  try {
    let user;
    const DBconnection = new PrismaClient();
    const [buyer, seller, admin] = await DBconnection.$transaction([
      DBconnection.buyer.findUnique({
        where: {
          email: email,
        },
      }),
      DBconnection.seller.findUnique({
        where: {
          email: email,
        },
      }),
      DBconnection.admin.findUnique({
        where: {
          email: email,
        },
      }),
    ]);

    if (buyer || seller || admin) {
      if (buyer) {
        user = buyer;
        user.role = USER_ROLE.BUYER;
      } else if (seller) {
        user = seller;
        user.role = USER_ROLE.SELLER;
      } else {
        user = admin;
        user.role = USER_ROLE.ADMIN;
      }

      if (await comparePasswords(password, user.password)) {
        //create credential
        console.log("password: ", user.password);
        console.log("id: ", user.id);
        await removeCredentialInCacheByUserID(user.id);
        return await generateCredentials(user.id, user.role);
      } else {
        const error = new UnauthorizedError(WRONG_PASSWORD);
        throw error;
      }
    } else {
      const exeption = new NotFoundError(USER_IS_NOT_FOUND);
      throw exeption;
    }
  } catch (e) {
    throw e;
  }
}

/**
 * WARNING: ONLY use this with valid userID
 */
async function generateCredentials(userID, role) {
  try {
    const accessToken = generateAccessToken(userID, role);
    const refreshToken = generateRefreshToken(userID, role);
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
async function generateNewAccessToken(userID, role) {
  try {
    const accessToken = generateAccessToken(userID, role);
    await storeAccessTokenToCache(userID, accessToken);
    return accessToken;
  } catch (e) {
    throw e;
  }
}

//private
async function storeAccessTokenToCache(userID, accessToken) {
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
  generateCredentials,
};
