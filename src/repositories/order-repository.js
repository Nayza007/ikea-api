const { Order, OrderItem, Payment } = require("../models");
const { Op } = require("sequelize");
exports.createOrder = (userId, totalPrice) => {
  return Order.create({ userId, totalPrice });
};
exports.findOrderByStatus = (userId, t) => {
  return Order.findOne({
    where: {
      [Op.and]: [{ userId }, { statusOrder: "pending" }],
    },
    transaction: t,
  });
};
exports.findOrderIds = (id, userId, t) => {
  return Order.findOne({
    where: {
      [Op.and]: [{ userId }, { statusOrder: "pending" }, { id }],
    },
    // transaction: t,
  });
};

//orderItem
exports.createOrderItem = (newCartData, t) => {
  return OrderItem.bulkCreate(newCartData, { transaction: t });
};
exports.findOrderItemByOrderId = (orderId, t) => {
  return OrderItem.findAll({ where: { orderId }, transaction: t });
};
exports.deleteOrderItems = (orderId, t) => {
  return OrderItem.destroy({ where: { orderId }, transaction: t });
};
exports.deleteOrder = (id, t) => {
  return Order.destroy({ where: { id }, transaction: t });
};

//transaction
exports.findOrderTransaction = (userId, totalPrice, t) => {
  console.log(userId, totalPrice);
  return Order.findOne({
    where: {
      [Op.and]: [
        {
          userId,
          totalPrice,
          statusOrder: "pending",
          statusDelivery: "pending",
        },
      ],
    },
    transaction: t,
  });
};
exports.updateStatusOrder = (id, t) => {
  return Order.update(
    { statusOrder: "success" },
    { where: { id }, transaction: t }
  );
};
exports.getOrderByAdmin = () => {
  return Order.findAll({
    include: {
      model: Payment,
    },
    order: [
      ["statusDelivery", "ASC"],
      ["Payment", "status", "ASC"],
      ["statusOrder", "ASC"],
    ],
  });
};
exports.findOrderById = (id, t) => {
  return Order.findOne({ where: { id }, transaction: t });
};
exports.updateOrderByDelivery = (id) => {
  return Order.update({ statusDelivery: "success" }, { where: { id } });
};
