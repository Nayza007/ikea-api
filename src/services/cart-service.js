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

exports.updateCartByCartId = async (cartId, quantityData) =>
  await cartRepository.patchCart(cartId, quantityData);

exports.deleteCartByCartId = async (cartId) => {
  await cartRepository.deleteCart(cartId);
};
