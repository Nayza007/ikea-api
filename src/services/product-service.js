const productRepository = require("../repositories/product-repository");

exports.getAllProduct = async () => {
  const isGetProduct = await productRepository.findAllProduct();
  return isGetProduct;
};
exports.getOneProduct = async (id, orderId, t) => {
  const isGetProduct = await productRepository.findOneProduct(id, orderId, t);
  return isGetProduct;
};
exports.getOneProductById = async (id) => {
  const isGetProduct = await productRepository.findOneProductItem(id);
  return isGetProduct;
};
exports.checkProductQuantityByCart = async (id) => {
  return await productRepository.findProductQuantityByCart(id);
};
exports.findItemByType = async (type) => {
  const isGetProduct = await productRepository.findAllProductItemByType(type);
  return isGetProduct;
};
exports.updateProductByQuantity = async (id, quantity, t) => {
  return await productRepository.updateProduct(id, quantity, t);
};
exports.searchProductByValue = async (id) => {
  return await productRepository.findSearch(id);
};
