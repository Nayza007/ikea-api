const { Payment } = require("../models");
exports.createPayment = (orderId, t) => {
  return Payment.create({ orderId }, { transaction: t });
};
exports.deletePayment = (orderId, t) => {
  // console.log(orderId, t, "hiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  return Payment.destroy({ where: { orderId }, transaction: t });
};
exports.updatePayment = (orderId, t) => {
  return Payment.update(
    { status: "success" },
    { where: { orderId }, transaction: t }
  );
};
