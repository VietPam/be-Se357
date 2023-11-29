import { SellerDAO } from "../model/private/DAO/SellerDAO.js";
import { hashPassword } from "../helper/working_with_password.js";
import { PrismaClient } from "@prisma/client";
import { ProductDAO } from "../model/private/DAO/productDAO.js";
async function createNewSeller(newSellerData) {
  try {
    const SellerRepository = new SellerDAO();
    newSellerData.password = await hashPassword(newSellerData.password);
    await SellerRepository.createSeller(newSellerData);
  } catch (e) {
    throw e;
  }
}

async function getSellerByID(SellerID) {
  try {
    const SellerRepository = new SellerDAO();
    const Seller = await SellerRepository.getSellerByID(SellerID);
    return Seller;
  } catch (e) {
    throw e;
  }
}

async function getProtectedSellerByID(SellerID) {
  try {
    const SellerRepository = new SellerDAO();
    const Seller = await SellerRepository.getSellerByID(SellerID);
    const protectedSellerData = {
      id: Seller.id,
      email: Seller.email,
      password: Seller.password,
      name: Seller.name,
      avatar: Seller.avatar,
      birthday: Seller.birthday,
      gender: Seller.gender,
      addresses: Seller.addresses,
      phones: Seller.phones,
    };
    return protectedSellerData;
  } catch (e) {
    throw e;
  }
}

async function getSellerByEmail(email) {
  try {
    const SellerRepository = new SellerDAO();
    const Seller = await SellerRepository.getSellerByEmail(email);
    return Seller;
  } catch (e) {
    throw e;
  }
}
/**
 *
 * @param {number} limit
 * @returns
 */
async function getSellers(limit) {
  try {
    const SellerRepository = new SellerDAO();
    const Sellers = await SellerRepository.getSellers(limit);
    return Sellers;
  } catch (e) {
    throw e;
  }
}

async function updateSeller(SellerID, updatedDatas) {
  try {
    const SellerRepository = new SellerDAO();
    await SellerRepository.updateSeller(SellerID, updatedDatas);
  } catch (e) {
    throw e;
  }
}

export default {
  createNewSeller,
  getSellerByID,
  getSellerByEmail,
  getSellers,
  getProtectedSellerByID,
  updateSeller,
};
