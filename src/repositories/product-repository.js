const { Product, OrderItem } = require("../models");
const { Op } = require("sequelize");
exports.findAllProduct = () => {
  return Product.findAll({
    where: { quantity: { [Op.gt]: 0 } },
    order: [["createdAt", "DESC"]],
  });
};

exports.findOneProduct = (id, orderId, t) => {
  return Product.findOne({
    where: { id },
    attributes: {
      exclude: ["productImage"],
    },
    include: {
      model: OrderItem,
      where: { productId: id, orderId },
    },
    transaction: t,
  });
};
exports.findOneProductItem = (id) => {
  return Product.findOne({
    where: { [Op.and]: [{ id }, { quantity: { [Op.gt]: 0 } }] },
  });
};
exports.findProductQuantityByCart = (id) => {
  return Product.findOne({ where: { id } });
};
exports.findAllProductItemByType = (type) => {
  return Product.findAll({
    where: { type },
    limit: 4,
  });
};
exports.updateProduct = (id, quantity, t) => {
  return Product.update({ quantity }, { where: { id }, transaction: t });
};
exports.findSearch = (id) => {
  return Product.findAll({
    where: { productName: { [Op.like]: `${id}%` }, quantity: { [Op.gt]: 0 } },
  });
};
