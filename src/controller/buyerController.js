import buyerService from "../service/buyerService.js";
import StatusCodes from "http-status-codes";
import { ConflictError, NotFoundError } from "../../src/common/errors.js";

export default class BuyerController {
  static async createNewBuyer(request, response, next) {
    try {
      const buyerData = request.body.data;
      await buyerService.createNewBuyer(buyerData);
      return response.status(StatusCodes.CREATED).json({
        data: {
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
        },
      });
    } catch (e) {
      return next(e);
    }
  }
  static async getBuyerByID(request, response, next) {
    try {
      const buyerID = request.query.id;
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
  static async getBuyers(request,response,next){
    try{
      const limit=request.query.limit;
      const buyers=await buyerService.getBuyers(limit);
      return response.status(StatusCodes.OK).json({
        data:{
          buyers
        }
      });
    }
    catch(e)
    {
      next(e);
    }
  }
  static async get
}
