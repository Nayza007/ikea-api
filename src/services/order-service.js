const orderRepository = require("../repositories//order-repository");
const { totalPrice } = require("./cart-service");
exports.createOrderByUserId = async (userId, totalPrice) => {
  return await orderRepository.createOrder(userId, totalPrice);
};
exports.checkOrderByStatus = async (id, userId, t) => {
  return await orderRepository.findOrderByStatus(id, userId, t);
};
exports.checkOrderByIds = async (id, userId, t) => {
  return await orderRepository.findOrderIds(id, userId, t);
};

//orderItem
exports.createOrderItem = async (newCartData, t) => {
  return await orderRepository.createOrderItem(newCartData, t);
};
exports.checkOrderItemByOrderId = async (orderId, t) => {
  return await orderRepository.findOrderItemByOrderId(orderId, t);
};
exports.deleteOrderItemByOrderId = async (orderId, t) => {
  return await orderRepository.deleteOrderItems(orderId, t);
};
exports.deleteOrder = async (id, t) => {
  return await orderRepository.deleteOrder(id, t);
};
//create transaction
exports.checkOrderByUserIdAndTotalPrice = async (userId, totalPrice, t) => {
  return await orderRepository.findOrderTransaction(userId, totalPrice, t);
};
exports.checkUpdateOrder = async (id, t) => {
  return await orderRepository.updateStatusOrder(id, t);
};
exports.findOrderByAdmin = async () => {
  return await orderRepository.getOrderByAdmin();
};
exports.checkOrderById = async (id, t) => {
  return await orderRepository.findOrderById(id, t);
};
exports.updateOrderByStatusDelivery = async (id) => {
  return await orderRepository.updateOrderByDelivery(id);
};
