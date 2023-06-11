const {
  validateRegister,
  validateLogin,
} = require("../validator/auth-validator");

const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const createError = require("../utils/create-error");
const { User } = require("../models");
const userService = require("../services/user-service");

//   console.log("register");
//   try {
//     const value = await validateRegister(req.body);
//     const isUserExist = await userService.checkEmailExist(value.email);
//     console.log("step1");
//     if (isUserExist) {
//       createError("Email already in use", 400);
//     }

//     // value.password = await bcryptSevice.hash(value.password);
//     // const user = await userService.createUser(value);
//     // const accessToken = tokenService.sign({ id: user.id });
//     // res.status(200).json({ accessToken });
//     res.send(value);
//   } catch (error) {
//     res.send(error);
//     next(error);
//   }
// };
exports.register = async (req, res, next) => {
  console.log("register");
  try {
    const value = await validateRegister(req.body);
    const isUserExist = await userService.checkEmailExist(value.email);
    if (isUserExist) createError("Email already in use", 400);
    value.password = await bcryptService.hash(value.password);
    const user = await userService.createUser(value);
    const accessToken = tokenService.sign({ id: user.id });
    console.log(accessToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.send(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  console.log("step1 login");
  try {
    const value = validateLogin(req.body);
    const user = await userService.getUserByEmail(value.email);
    if (!user) createError("invalid credential", 400);
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
      createError("invalid credential", 400);
    }
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
