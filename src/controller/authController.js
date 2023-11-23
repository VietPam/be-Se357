import buyerService from "../service/buyerService.js";
import operationService from "../service/operationService.js";
import sellerService from "../service/sellerService.js";
import StatusCodes from "http-status-codes";

export default class AuthController {
  static async login(request, response, next) {
    try {
      const accountData = request.body.data;
      const credentials = await operationService.getCredential(
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
      const userID = request.headers["authorization"];
      await operationService.removeCredentialByUserID(userID);
      return response.status(StatusCodes.OK).json({
        message: "Logout successfully",
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async registerBuyer(request, response, next) {
    try {
      const buyerData = request.body.data;
      await buyerService.createNewBuyer(buyerData);
      const credentials = await buyerService.getBuyerByEmail(buyerData.email);
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
      const credentials = await operationService.getCredential(
        buyerData.email,
        buyerData.password
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
      const userID = request.headers["authorization"];
      const  accessToken=await operationService.generateNewAccessToken(userID);
      return response.status(StatusCodes.OK).json({
        data: {
          accessToken:accessToken
        }
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
