function createNewAdmin(email, password, name, bio) {}
function getAdminByID(adminID) {}
function getAdminByEmail(email) {}
function updatePassword(adminID, newPassword) {}
function updateName(adminID, newName) {}
function updateBio(adminID, newBio) {}
function updateActivationStatus(adminID, newActivationStatus) {}

module.exports = {
  createNewAdmin,
  getAdminByID,
  getAdminByEmail,
  updatePassword,
  updateName,
  updateBio,updateActivationStatus
};
