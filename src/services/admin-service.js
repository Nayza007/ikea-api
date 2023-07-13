const adminRepository = require("../repositories/admin-repository");

exports.checkProductByName = async (productName) => {
  const isFindProduct = await adminRepository.findProductByName(productName);
  return !!isFindProduct;
};

exports.addProduct = (data) => adminRepository.createProduct(data);

exports.fetchProductByAdmin = async () =>
  await adminRepository.findAllProduct();
exports.getAllTypeProduct = async () => {
  return await adminRepository.findTypeProduct();
};
exports.checkCartByAdmin = async (productId) => {
  const checkCart = await adminRepository.findCart(productId);
  return checkCart;
};
exports.checkOrderItemByAdmin = async (productId) => {
  return await adminRepository.findOrderItem(productId);
};
exports.deleteOrderItemByAdmin = async (productId) => {
  return await adminRepository.deleteOrderItemByAdmin(productId);
};
exports.deleteCartByAdmin = async (productId) => {
  const result = await adminRepository.deleteCart(productId);
  return !!result;
};

exports.deleteProductByAdmin = async (productId) =>
  await adminRepository.deleteProduct(productId);
exports.updateProductByAdmin = async (product) =>
  await adminRepository.updateProduct(product);
