const { Cart, Product, sequelize } = require("../models");
const { Op } = require("sequelize");
exports.findCartById = (productId, userId) => {
  return Cart.findOne({
    where: { userId, productId },
  });
};
exports.findQuantityProductByCart = (productId, userId, quantity, t) => {
  console.log(productId, userId, quantity);
  return Cart.findOne({
    where: {
      productId,
      userId,
      quantity: { [Op.lte]: +quantity },
    },
    transaction: t,
  });
};
exports.createCart = (productId, userId) => {
  return Cart.create({
    productId,
    userId,
    quantity: 1,
  });
};

exports.updateCart = (cartId, quantity, t) => {
  return Cart.update(
    { quantity: +quantity + 1 },
    {
      where: {
        id: cartId,
      },
      transaction: t,
    }
  );
};

exports.findAllCartById = (userId) => {
  return Cart.findAll({
    where: { userId },
    include: Product,
  });
};

exports.patchCart = (cartId, quantityData) => {
  return Cart.update(
    { quantity: quantityData },
    {
      where: {
        id: cartId,
      },
    }
  );
};

exports.deleteCart = (cartId) => {
  return Cart.destroy({ where: { id: cartId } });
};

exports.findTotalPrice = (quantity, price) => {
  return Cart.findAll({
    attributes: [[sequelize.fn("SUM", sequelize.col("price")), "totalPrice"]],
    include: Product,
  });
};

exports.cartCount = (userId) => {
  return Cart.findOne({
    where: { userId },
    attributes: [[sequelize.fn("SUM", sequelize.col("quantity")), "cartCount"]],
  });
};

exports.findCartByUserId = (userId, t) => {
  return Cart.findAll({ where: { userId }, transaction: t });
};

//transaction
exports.deleteCartTransaction = (id, t) => {
  return Cart.destroy({ where: { id }, transaction: t });
};
