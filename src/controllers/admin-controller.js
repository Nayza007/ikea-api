const fs = require("fs");
const { validateProduct } = require("../validator/product-validator");
const adminService = require("../services//admin-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
exports.addProduct = async (req, res, next) => {
  try {
    const file = req.file;
    // console.log(file);
    if (!file) createError("file is required", 400);

    const result = await uploadService.upload(req.file.path);

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
