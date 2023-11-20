const EXPIRED_TOKEN = "Expired token";
const NOT_LEGITIMATE_TOKEN = "Token is not legit";


export const standarlizeBuyerData = (request, response, next) => {
  if (
    !isEmailValid(request.body.data.email) ||
    !(typeof request.body.data.password === "string") ||
    !(typeof request.body.data.name === "string") ||
    !isDateValid(new Date(request.body.data.birthday))
  ) {
    const error = new BadRequestError(MISSING_OR_INVALID_PARAMETER);
    next(error);
  }
  request.body.data.birthday = new Date(
    request.body.data.birthday
  ).toISOString();
  next();
};

export const convertAccessTokenToUserID = async (request, response, next) => {
    const token = request.headers["authorization"];
    const key = fs.readFileSync(
      path.join(accessTokenKeysFolderPath, "key.key.pub"),
      "utf8"
    );
  
    jwt.verify(token, key, { algorithms: ["RS256"] }, async (err, decoded) => {
      if (err) {
        console.error("Err:", err.message);
        const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
        return next(error);
      } else if (token !== (await cache.get(`${decoded}:accessToken`))) {
        const error = new UnauthorizedError(EXPIRED_TOKEN);
        return next(error);
      } else {
        request.headers["authorization"].userID = decoded;
        return next();
      }
    });
  };
  
  export const convertRefreshTokenToUserID = async (request, response, next) => {
    const token = request.headers["authorization"];
    const key = fs.readFileSync(
      path.join(refreshTokenKeysFolderPath, "key.key.pub"),
      "utf8"
    );
  
    jwt.verify(token, key, { algorithms: ["RS256"] }, async (err, decoded) => {
      if (err) {
        console.error(err);
        const error = new ForbiddenError(NOT_LEGITIMATE_TOKEN);
        return next(error);
      } else if (token !== (await cache.get(`${decoded}:refreshToken`))) {
        const error = new UnauthorizedError(EXPIRED_TOKEN);
        return next(error);
      } else {
        request.headers["authorization"].userID = decoded;
        return next();
      }
    });
  };
  