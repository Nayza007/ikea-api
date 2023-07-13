const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();

router.get("/product", productController.getProduct);
router.get("/product/:id", productController.getProductItem);
router.get("/search/:id", productController.getSearchResult);

module.exports = router;
