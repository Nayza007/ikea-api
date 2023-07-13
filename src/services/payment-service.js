const paymentRepository = require("../repositories/payment-repository");

exports.createPaymentByOrderId = async (orderId, t) => {
  return await paymentRepository.createPayment(orderId, t);
};
exports.deletePaymentByOrderId = async (orderId, t) => {
  return await paymentRepository.deletePayment(orderId, t);
};
exports.updatePaymentByStatus = async (orderId, t) => {
  return await paymentRepository.updatePayment(orderId, t);
};
