import buyerService from "../service/buyersService.js";
import StatusCodes from "http-status-codes";
import { ConflictError, NotFoundError } from "../common/errors.js";

export default class BuyersController {
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
