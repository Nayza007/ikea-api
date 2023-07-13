const { Product, Cart, OrderItem } = require("../models");

exports.findProductByName = (productName) => {
  return Product.findOne({
    where: { productName: productName },
  });
};
exports.findTypeProduct = () => {
  return Product.findAll({ attributes: ["type"], group: "type" });
};
exports.createProduct = (data) => Product.create(data);
exports.findAllProduct = () => Product.findAll();
exports.findCart = (productId) => Cart.findAll({ where: { productId } });
exports.findOrderItem = (productId) =>
  OrderItem.findAll({ where: { productId } });

exports.deleteCart = (productId) => Cart.destroy({ where: { productId } });
exports.deleteOrderItemByAdmin = (productId) =>
  OrderItem.destroy({ where: { productId } });
exports.deleteProduct = (productId) =>
  Product.destroy({ where: { id: productId } });
exports.updateProduct = (product) =>
  Product.update(
    {
      productName: product.productName,
      productImage: product.productImage,
      price: product.price,
      quantity: product.quantity,
      detail: product.detail,
      // type: product.type,
    },
    { where: { id: product.productId } }
  );
