import { BuyerDAO } from "../model/private/DAO/buyerDAO.js";
import { hashPassword } from "../helper/working_with_password.js";
import { PrismaClient } from "@prisma/client";
import { ProductDAO } from "../model/private/DAO/productDAO.js";
async function createNewBuyer(newBuyerData) {
  try {
    const buyerRepository = new BuyerDAO();
    newBuyerData.password = await hashPassword(newBuyerData.password);
    await buyerRepository.createBuyer(newBuyerData);
  } catch (e) {
    throw e;
  }
}

async function getBuyerByID(buyerID) {
  try {
    const buyerRepository = new BuyerDAO();
    const buyer = await buyerRepository.getBuyerByID(buyerID);
    return buyer;
  } catch (e) {
    throw e;
  }
}

async function getProtectedBuyerByID(buyerID) {
  try {
    const buyerRepository = new BuyerDAO();
    const buyer = await buyerRepository.getBuyerByID(buyerID);
    const protectedBuyerData = {
      id: buyer.id,
      email: buyer.email,
      password: buyer.password,
      name: buyer.name,
      avatar: buyer.avatar,
      birthday: buyer.birthday,
      gender: buyer.gender,
      addresses: buyer.addresses,
      phones: buyer.phones,
    };
    return protectedBuyerData;
  } catch (e) {
    throw e;
  }
}

async function getBuyerByEmail(email) {
  try {
    const buyerRepository = new BuyerDAO();
    const buyer = await buyerRepository.getBuyerByEmail(email);
    return buyer;
  } catch (e) {
    throw e;
  }
}
/**
 *
 * @param {number} limit
 * @returns
 */
async function getBuyers(limit) {
  try {
    const buyerRepository = new BuyerDAO();
    const buyers = await buyerRepository.getBuyers(limit);
    return buyers;
  } catch (e) {
    throw e;
  }
}

async function updateBuyer(buyerID, updatedDatas) {
  try {
    const buyerRepository = new BuyerDAO();
    await buyerRepository.updateBuyer(buyerID, updatedDatas);
  } catch (e) {
    throw e;
  }
}

async function getFavouriteProducts(buyerID) {
  try {
    const dbConnection = new PrismaClient();
    const likedProducts = await dbConnection.$transaction(
      dbConnection.buyer_Like_Product.findMany({
        where: {
          buyerId: buyerId,
        },
        include: {
          product: true, // Include the related product data
        },
      })
    );

    const favouriteProducts = likedProducts.map((like) => {
      const product = like.product;
      return {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        saleOff: product.saleOff,
      };
    });
    return favouriteProducts;
  } catch (e) {
    throw e;
  }
}

async function addNewFavouriteProduct(buyerID, productID) {
  try {
    const dbConnection = new PrismaClient();
    const buyerRepository = new BuyerDAO();
    const productRepository = new ProductDAO();
    const product = await productRepository.getProductByID(productID);
    const buyer = await buyerRepository.getBuyerByID(buyerID);
    if (buyer && product) {
      await dbConnection.buyer_Like_Product.create({
        data: {
          productId: productID,
          buyerId: buyerID,
        },
      });
    }
  } catch (e) {
    throw e;
  }
}

async function deleteFavouriteProduct(buyerID, productID) {
  try {
    const dbConnection = new PrismaClient();
    await dbConnection.buyer_Like_Product.delete({
      where: {
        productId: productID,
        buyerId: buyerID,
      },
    });
  } catch (e) {
    throw e;
  }
}

async function getShoppingCart(buyerID) {
  try {
    const dbConnection = new PrismaClient();
    const cart = await dbConnection.cartItem.findMany({
      where: {
        buyerId: buyerID,
      },
    });
    return cart;
  } catch (e) {
    throw e;
  }
}
async function setShoppingCart(buyerID, newCart) {
  try {
    const dbConnection = new PrismaClient();
    const Datas = newCart.map((item) => {
      return {
        quantity: item.quantity,
        productId: item.productId,
        buyerId: buyerID,
      };
    });
    await dbConnection.$transaction([
      dbConnection.cartItem.deleteMany({
        where: {
          buyerId: buyerID,
        },
      }),
      dbConnection.cartItem.createMany({
        data: Datas,
      }),
    ]);
  } catch (e) {
    throw e;
  }
}

async function setFavouriteProducts(buyerID, newFavouriteProducts) {
  try {
    const dbConnection = new PrismaClient();
    const Datas = newFavouriteProducts.map((item) => {
      return {
        productId: item.productId,
        buyerId: buyerID,
      };
    });
    await dbConnection.$transaction([
      dbConnection.buyer_Like_Product.deleteMany({
        where: {
          buyerId: buyerID,
        },
      }),
      dbConnection.cartItem.createMany({
        data: Datas,
      }),
    ]);
  } catch (e) {
    throw e;
  }
}

export default {
  createNewBuyer,
  getBuyerByID,
  getBuyerByEmail,
  getBuyers,
  getProtectedBuyerByID,
  updateBuyer,
  getFavouriteProducts,
  addNewFavouriteProduct,
  deleteFavouriteProduct,
  getShoppingCart,
  setShoppingCart,
  setFavouriteProducts,
};
