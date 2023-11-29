import buyersService from "../service/buyersService.js";
import ordersService from "../service/ordersService.js";
import StatusCodes from "http-status-codes";
import { ConflictError, NotFoundError } from "../common/errors.js";
import reviewsService from "../service/reviewsService.js";
import cartItemsService from "../service/cartItemsService.js";

const CREATE_SUCCESSFULLY = "Created successfully";
const UPDATE_SUCCESSFULLY = "Updated successfully";

export default class BuyersController {
  static async createNewBuyer(request, response, next) {
    try {
      const buyerData = request.body.data;
      await buyersService.createNewBuyer(buyerData);
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
      const buyer = await buyersService.getBuyerByID(buyerID);
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
      const buyers = await buyersService.getBuyers(limit);

      const publicDatas = buyers.map((buyer) => {
        return {
          id: buyer.id,
          email: buyer.email,
          name: buyer.name,
          avatar: buyer.avatar,
        };
      });
      return response.status(StatusCodes.OK).json({
        data: {
          publicDatas,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  static async getProtectedBuyerDataByID(request, response, next) {
    try {
      const buyerID = request.params.id;
      const protectedBuyerData = await buyersService.getProtectedBuyerByID(
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
      const protectedBuyerData = await buyersService.updateBuyer(
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

  static async getFavouriteProducts(request, response, next) {
    try {
      const buyerID = request.params.id;
      const favouriteProducts = await buyersService.getFavouriteProducts(
        buyerID
      );
      return response.status(StatusCodes.OK).json({
        data: favouriteProducts,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async addProductToFavouriteProducts(request, response, next) {
    try {
      const buyerID = request.params.id;
      const productID = request.body.data.productId;
      await buyersService.addNewFavouriteProduct(buyerID, productID);
      return response.status(StatusCodes.OK).json({
        message: UPDATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async deleteProductFromFavouriteProducts(request, response, next) {
    try {
      const buyerID = request.params.id;
      const productID = request.params.productId;
      await buyersService.deleteFavouriteProduct(buyerID, productID);
      return response.status(StatusCodes.OK).json({
        message: UPDATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async getOrders(request, response, next) {
    try {
      const buyerID = request.params.id;
      const orders = await ordersService.getOrdersByUserID(buyerID);
      return response.status(StatusCodes.OK).json({
        data: orders,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async getReviews(request, response, next) {
    try {
      const buyerID = request.params.id;
      const reviews = await reviewsService.getReviewsByBuyerID(buyerID);
      return response.status(StatusCodes.OK).json({
        data: reviews,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async getCart(request, response, next) {
    try {
      const buyerID = request.params.id;
      const shoppingCart = await buyersService.getShoppingCart(buyerID);
      return response.status(StatusCodes.OK).json({
        data: shoppingCart,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async setCart(request, response, next) {
    try {
      const buyerID = request.params.id;
      const newShoppingCart = request.body.data.shoppingCart;
      await buyersService.setShoppingCart(buyerID, newShoppingCart);
      return response.status(StatusCodes.OK).json({
        message: UPDATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async addItemToCart(request, response, next) {
    try {
      const buyerID = request.params.id;
      const cartItem = request.body.data.cartItem;
      await cartItemsService.createCartItem(buyerID, cartItem);
      return response.status(StatusCodes.OK).json({
        message: UPDATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }
  static async deleteItemInCart(request, response, next) {
    try {
      const cartItemId = request.params.itemId;
      await cartItemsService.deleteCartItem(cartItemId);
      return response.status(StatusCodes.OK).json({
        message: UPDATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }
  static async setFavouriteProducts(request, response, next) {
    try {
      const buyerID = request.params.id;
      const favouriteProducts = request.body.data.favouriteProducts;
      await buyersService.setFavouriteProducts(buyerID,favouriteProducts);
      return response.status(StatusCodes.OK).json({
        message: UPDATE_SUCCESSFULLY,
      });
    } catch (e) {
      return next(e);
    }
  }
}
