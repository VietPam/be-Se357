import buyerService from "../service/buyerService.js";
import operationService from "../service/operationService.js";
import sellerService from "../service/sellerService.js";
import StatusCodes from "http-status-codes";
import { ConflictError, NotFoundError } from "../../src/common/errors.js";

const USER_NOT_FOUND = "This user is not found";
const USER_ROLE={BUYER:"buyer",SELLER:"seller",ADMIN:"admin"};
export default class AuthController {
  static async login(request, response, next) {
    try {
      const accountData = request.body.data;
      const credentials =
        await operationService.getCredentialByEmailAndPassword(
          accountData.email,
          accountData.password
        );
      return response.status(StatusCodes.OK).json({
        data: {
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
        },
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async logout(request, response, next) {
    try {
      const userID = request.headers["authorization"].id;
      await operationService.removeCredentialInCacheByUserID(userID);
      return response.status(StatusCodes.OK).json({
        message: "Logout successfully",
      });
    } catch (e) {
      next(e);
    }
  }

  static async registerBuyer(request, response, next) {
    try {
      const buyerData = request.body.data;
      await buyerService.createNewBuyer(buyerData);
      const buyer = await buyerService.getBuyerByEmail(buyerData.email);
      const credentials = await operationService.generateCredentials(
        buyer.id,
        USER_ROLE.BUYER
      );
      return response.status(StatusCodes.CREATED).json({
        data: {
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
        },
      });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async registerSeller(request, response, next) {
    try {
      const sellerData = request.body.data;
      await sellerService.createNewSeller(sellerData);
      const seller = await sellerService.getSellerByEmail(sellerData.email);
      const credentials = await operationService.generateCredentials(
        seller.id,
        USER_ROLE.SELLER
      );
      return response.status(StatusCodes.CREATED).json({
        data: {
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
        },
      });
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async generateNewAccessToken(request, response, next) {
    try {
      const user = request.headers["authorization"];
      const accessToken = await operationService.generateNewAccessToken(user.id,user.role);
      return response.status(StatusCodes.OK).json({
        data: {
          accessToken: accessToken,
        },
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
