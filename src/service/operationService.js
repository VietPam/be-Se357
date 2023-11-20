//public
function getCredential(email, password) {}
function removeCredentialByUserID(userID) {}
function refreshAccessToken(userID){}

//private
function storeAccessTokenToCache(accessToken){}
function storeRefreshTokenToCache(refreshToken){}


module.exports = {
  getCredential,
  removeCredentialByUserID,
  refreshAccessToken
};

