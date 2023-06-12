const { Product } = require("../models");

exports.findProductByName = (productName) => {
  return Product.findOne({
    where: { productName: productName },
  });
};
exports.createProduct = (data) => Product.create(data);
