const express = require("express");
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post(
  "/product",
  upload.single("productImage"),
  adminController.addProduct
);
router.get("/fetch", adminController.fetchProduct);
router.delete("/delete/:id", adminController.deleteProduct);
router.patch(
  "/update",
  upload.single("productImage"),
  authenticate,
  adminController.updateProduct
);
router.get("/transaction", adminController.fetchTransaction);
router.delete("/transaction/:id", adminController.deleteOrder);
router.patch("/transaction/:id", adminController.updateOrder);
module.exports = router;
