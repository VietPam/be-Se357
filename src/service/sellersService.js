import { SellerDAO } from "../model/private/DAO/sellerDAO.js";
import { hashPassword } from "../helper/working_with_password.js";
async function createNewSeller(newSellerData) {
  try {
    const sellerRepository = new SellerDAO();
    newSellerData.password = await hashPassword(newSellerData.password);
    await sellerRepository.createSeller(newSellerData);
  } catch (e) {
    throw e;
  }
}
function getSellerByID(sellerID) {}

async function getSellerByEmail(email) {
  try {
    const sellerRepository = new SellerDAO();
    const seller = await sellerRepository.getSellerByEmail(email);
    return seller;
  } catch (e) {
    throw e;
  }
}


function updatePassword(sellerID, newPassword) {}
function updateName(sellerID, newName) {}
function updateBio(sellerID, newBio) {}
function updateActivationStatus(sellerID, newActivationStatus) {}

export default {
  createNewSeller,
  getSellerByID,
  getSellerByEmail,
  updateBio,
  updateName,
  updatePassword,
  updateActivationStatus,
};
