const userRepository = require("../repositories/user-repository");

exports.checkEmailExist = async (email) => {
  const existUser = await userRepository.getUserByEmail(email);
  console.log(!!existUser);
  return !!existUser;
};

exports.createUser = (user) => userRepository.createUser(user);

exports.getUserByEmail = async (email) =>
  await userRepository.getUserByEmail(email);

exports.getUserById = (id) => userRepository.getUserById(id);
