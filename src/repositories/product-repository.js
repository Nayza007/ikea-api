const { Product } = require("../models");

exports.findAllProduct = () => {
  return Product.findAll();
};
