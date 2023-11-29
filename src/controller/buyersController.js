import buyerService from "../service/buyersService.js";
import StatusCodes from "http-status-codes";
import { ConflictError, NotFoundError } from "../common/errors.js";

const CREATE_SUCCESSFULLY = "Created successfully";
const UPDATE_SUCCESSFULLY = "Updated successfully";

export default class BuyersController {
  static async createNewBuyer(request, response, next) {
    try {
      const buyerData = request.body.data;
      await buyerService.createNewBuyer(buyerData);
      return response.status(StatusCodes.CREATED).json({
        message: CREATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }
  static async getBuyerByID(request, response, next) {
    try {
      const buyerID = request.params.id;
      const buyer = await buyerService.getBuyerByID(buyerID);
      response.status(StatusCodes.OK).json({
        data: {
          buyer,
        },
      });
    } catch (e) {
      return next(e);
    }
  }

  //gonna handle here later
  static async getPublicBuyers(request, response, next) {
    try {
      const limit = request.query.limit;
      const buyers = await buyerService.getBuyers(limit);
      return response.status(StatusCodes.OK).json({
        data: {
          buyers,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async getProtectedBuyerDataByID(request, response, next) {
    try {
      const buyerID = request.params.id;
      const protectedBuyerData = await buyerService.getProtectedBuyerByID(
        buyerID
      );
      response.status(StatusCodes.OK).json({
        data: {
          protectedBuyerData,
        },
      });
    } catch (e) {
      return next(e);
    }
  }

  static async updateBuyer(request, response, next) {
    try {
      const buyerID = request.params.id;
      const updatedDatas = request.body.data;
      const protectedBuyerData = await buyerService.updateBuyer(
        buyerID,
        updatedDatas
      );
      response.status(StatusCodes.OK).json({
        message: UPDATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }
}
