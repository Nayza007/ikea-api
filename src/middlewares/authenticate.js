const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer"))
      createError("Unauthorized", 401);
    const token = authorization.split(" ")[1];
    if (!token) createError("Unauthorized", 401);
    const payload = tokenService.verify(token);

    const user = await userService.getUserById(payload.id);

    if (!user) {
      createError("Unauthorized", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
