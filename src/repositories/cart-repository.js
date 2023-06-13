const { Cart, Product } = require("../models");
exports.findCartById = (productId, userId) => {
  return Cart.findOne({
    where: { userId, productId },
  });
};

exports.createCart = (productId, userId) => {
  return Cart.create({
    productId,
    userId,
    quantity: 1,
  });
};

exports.updateCart = (cartId, quantity) => {
  return Cart.update(
    { quantity: +quantity + 1 },
    {
      where: {
        id: cartId,
      },
    }
  );
};

exports.findAllCartById = (userId) => {
  return Cart.findAll({
    where: { userId },
    include: Product,
  });
};
