const cartRepository = require("../repositories/cart-repository");

exports.checkCartById = async (productId, userId) => {
  return await cartRepository.findCartById(productId, userId);
};

exports.createCartById = async (productId, userId) => {
  return await cartRepository.createCart(productId, userId);
};
exports.updateCartById = async (cartId, quantity) =>
  await cartRepository.updateCart(cartId, quantity);

exports.getCartById = async (userId) =>
  await cartRepository.findAllCartById(userId);
