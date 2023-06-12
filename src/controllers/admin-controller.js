const { validateProduct } = require("../validator/product-validator");
const adminService = require("../services//admin-service");
const createError = require("../utils/create-error");
exports.addProduct = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);
    if (!file) createError("file is required", 400);
    const value = await validateProduct(req.body);

    const data = { ...value, productImage: file.path };
    console.log(data);
    const findProduct = await adminService.checkProductByName(
      value.productName
    );
    if (findProduct) createError("This product is duplicate", 400);
    const product = await adminService.addProduct(data);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
