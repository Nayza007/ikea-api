const productService = require("../services/product-service");

exports.getProduct = async (req, res, next) => {
  try {
    const Data = await productService.getAllProduct();
    res.send(Data);
  } catch (error) {
    next(error);
  }
};
