import { BuyerDAO } from "../model/private/DAO/buyerDAO.js";
import { hashPassword } from "../helper/working_with_password.js";
async function createNewBuyer(newBuyerData) {
  try{
    const buyerRepository = new BuyerDAO();
    newBuyerData.password=await hashPassword(newBuyerData.password);
    await buyerRepository.createBuyer(newBuyerData);
  }
  catch(e)
  {
    throw e
  }
}

async function getBuyerByID(buyerID) {
  try{
    const buyerRepository = new BuyerDAO();
    const buyer = await buyerRepository.getBuyerByID(buyerID);
    return buyer;
  }
  catch(e)
  {
    throw e
  }
}

async function getBuyerByEmail(email) {
  try{
    const buyerRepository = new BuyerDAO();
    const buyer = await buyerRepository.getBuyerByEmail(email);
    return buyer;
  }
  catch(e)
  {
    throw e
  }
}
async function getBuyers(limit) {
  try{
    const buyerRepository = new BuyerDAO();
    const buyers = await buyerRepository.getBuyers(limit);
    return buyers;
  }
  catch(e)
  {
    throw e
  }
}

function updatePassword(buyerID, newPassword) {}
function updateName(buyerID, newName) {}
function updateGender(buyerID,newGender){}
function updateBirthday(buyerID, newBirthday) {}
function addNewItemToShoppingCart(buyerID, newItem) {}
function removeItemFromShoppingCart(buyerID, item) {}
function addNewOrder(buyerID, newOrderID) {}
function removeOrder(buyerID, OrderID) {}
function addNewAddress(buyerID, NewAddress) {}
function removeAddress(buyerID, address) {}
function addNewReview(buyerID, newReviewID) {}
function updateActivationStatus(buyerID, newActivationStatus) {}

export default {
  createNewBuyer,
  getBuyerByID,
  getBuyerByEmail,
  updatePassword,
  updateBirthday,
  updateName,
  updateGender,
  addNewAddress,
  removeAddress,
  addNewItemToShoppingCart,
  removeItemFromShoppingCart,
  addNewOrder,
  removeOrder,
  addNewReview,
  updateActivationStatus,getBuyers
};
