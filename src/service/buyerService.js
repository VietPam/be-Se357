function createNewBuyer(newBuyer) {}
function getBuyerByID(buyerID) {}
function getBuyerByEmail(email) {}
function updatePassword(buyerID, newPassword) {}
function updateName(buyerID, newName) {}
function updateBirthday(buyerID, newBirthday) {}
function addNewItemToShoppingCart(buyerID, newItem) {}
function removeItemFromShoppingCart(buyerID, item) {}
function addNewOrder(buyerID, newOrderID) {}
function removeOrder(buyerID, OrderID) {}
function addNewAddress(buyerID, NewAddress) {}
function removeAddress(buyerID, address) {}
function addNewReview(buyerID, newReviewID) {}
function updateActivationStatus(buyerID, newActivationStatus) {}

module.exports = {
  createNewBuyer,
  getBuyerByID,
  getBuyerByEmail,
  updatePassword,
  updateBirthday,
  updateName,
  addNewAddress,
  removeAddress,
  addNewItemToShoppingCart,
  removeItemFromShoppingCart,
  addNewOrder,
  removeOrder,
  addNewReview,
  updateActivationStatus,
};
