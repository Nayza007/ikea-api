const cartRepository = require("../repositories/cart-repository");

exports.checkCartById = async (productId, userId) => {
  return await cartRepository.findCartById(productId, userId);
};
exports.checkQuantityProductByCart = async (productId, userId, quantity, t) => {
  return await cartRepository.findQuantityProductByCart(
    productId,
    userId,
    quantity,
    t
  );
};
exports.createCartById = async (productId, userId) => {
  return await cartRepository.createCart(productId, userId);
};
exports.updateCartById = async (cartId, quantity, t) =>
  await cartRepository.updateCart(cartId, quantity, t);

exports.getCartById = async (userId) =>
  await cartRepository.findAllCartById(userId);

exports.updateCartByCartId = async (cartId, quantityData) =>
  await cartRepository.patchCart(cartId, quantityData);

exports.deleteCartByCartId = async (cartId) => {
  await cartRepository.deleteCart(cartId);
};

exports.totalPrice = async (quantity, price) =>
  await cartRepository.findTotalPrice(quantity, price);

exports.cartCountByUserId = async (userId) =>
  await cartRepository.cartCount(userId);
exports.checkCartByUserId = async (userId, t) =>
  await cartRepository.findCartByUserId(userId, t);
//transaction
exports.deleteCartByCartIdTransaction = async (cartId, t) => {
  await cartRepository.deleteCartTransaction(cartId, t);
};
