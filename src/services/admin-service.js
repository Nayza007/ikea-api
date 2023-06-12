const adminRepository = require("../repositories/admin-repository");

exports.checkProductByName = async (productName) => {
  const isFindProduct = await adminRepository.findProductByName(productName);
  return !!isFindProduct;
};

exports.addProduct = (data) => adminRepository.createProduct(data);
