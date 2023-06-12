const express = require("express");
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post(
  "/product",
  upload.single("productImage"),
  adminController.addProduct
);

module.exports = router;
