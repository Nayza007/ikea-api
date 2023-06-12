const productRepository = require("../repositories/product-repository");

exports.getAllProduct = async () => {
  const isGetProduct = await productRepository.findAllProduct();
  return isGetProduct;
};
