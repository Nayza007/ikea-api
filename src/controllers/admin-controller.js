const fs = require("fs");
const { validateProduct } = require("../validator/product-validator");
const adminService = require("../services/admin-service");
const orderService = require("../services/order-service");
const paymentService = require("../services/payment-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
const { sequelize } = require("../models");
exports.addProduct = async (req, res, next) => {
  try {
    const file = req.file;

    // console.log(file);
    if (!file) createError("file is required", 400);

    const result = await uploadService.upload(req.file.path);
    console.log(result);
    const value = await validateProduct(req.body);

    const data = { ...value, productImage: result.secure_url };

    const findProduct = await adminService.checkProductByName(
      value.productName
    );
    if (findProduct) createError("This product is duplicate", 400);
    const product = await adminService.addProduct(data);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
};

exports.fetchProduct = async (req, res, next) => {
  try {
    const fetchData = await adminService.fetchProductByAdmin();
    const typeData = await adminService.getAllTypeProduct();
    const newData = {
      fetchProduct: fetchData,
      type: typeData,
    };
    console.log(fetchData);
    res.status(200).json(newData);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkCart = await adminService.checkCartByAdmin(id);
    const checkOrderItems = await adminService.checkOrderItemByAdmin(id);
    res.json(checkCart);
    if (checkCart.length > 0 || checkOrderItems.length > 0) {
      await adminService.deleteOrderItemByAdmin(id);
      await adminService.deleteCartByAdmin(id);
      await adminService.deleteProductByAdmin(id);
      res.status(200).json({ msg: "Delete Complete" });
    } else {
      await adminService.deleteProductByAdmin(id);
      res.status(200).json({ msg: "Delete Complete" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const value = req.body;
    const result = await uploadService.upload(req.file.path);
    const data = { ...value, productImage: result.secure_url };

    const updateData = await adminService.updateProductByAdmin(data);
    // res.status(200).json(Data);
    res.status(200).json(req.file);
  } catch (error) {
    next(error);
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
};

exports.fetchTransaction = async (req, res, next) => {
  try {
    const orderData = await orderService.findOrderByAdmin();

    res.status(200).json(orderData);
  } catch (error) {
    next(error);
  }
};
exports.deleteOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const orderId = req.params;
    const checkOrder = await orderService.checkOrderById(orderId.id, t);
    if (!checkOrder) createError("Order not found", 400);
    console.log(checkOrder.id);
    const deleteOrderItem = await orderService.deleteOrderItemByOrderId(
      checkOrder.id,
      t
    );
    console.log(deleteOrderItem);
    if (!deleteOrderItem) createError("Delete Order item fail", 400);
    const deletePayment = await paymentService.deletePaymentByOrderId(
      checkOrder.id,
      t
    );
    if (!deletePayment) createError("Delete Payment fail", 400);
    const deleteOrder = await orderService.deleteOrder(checkOrder.id, t);
    if (!deleteOrder) createError("Delete Order fail", 400);
    await t.commit();
    res.status(200).json({ msg: "Delete Complete" });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params;
    const updateOrder = await orderService.updateOrderByStatusDelivery(
      orderId.id
    );
    console.log(updateOrder);
    // if (updateOrder) createError("Status update fail", 400);
    res.status(200).json({ msg: "Update complete" });
  } catch (error) {
    next(error);
  }
};
