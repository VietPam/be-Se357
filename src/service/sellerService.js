function createNewSeller(newSeller) {}
function getSellerByID(sellerID) {}
function getSellerByEmail(email) {}
function updatePassword(sellerID, newPassword) {}
function updateName(sellerID, newName) {}
function updateBio(sellerID, newBio) {}
function updateActivationStatus(sellerID, newActivationStatus) {}


module.exports = {
  createNewSeller,
  getSellerByID,
  getSellerByEmail,
  updateBio,
  updateName,
  updatePassword,
  updateActivationStatus
};
