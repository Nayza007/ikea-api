const productService = require("../services/product-service");
const cartService = require("../services/cart-service");
const createError = require("../utils/create-error");
exports.getProduct = async (req, res, next) => {
  try {
    if (req.body.id) {
      const cartCount = await cartService.cartCountByUserId(req.body.id);
    }
    const productData = await productService.getAllProduct();

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
};
exports.getProductItem = async (req, res, next) => {
  try {
    const itemData = await productService.getOneProductById(req.params.id);
    if (!itemData) createError("Item not found", 400);
    const newData = {
      item: itemData || [],
    };
    res.status(200).json(newData);
  } catch (error) {}
};
exports.getSearchResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const searchData = await productService.searchProductByValue(id);

    res.status(200).json(searchData);
  } catch (error) {
    next(error);
  }
};
