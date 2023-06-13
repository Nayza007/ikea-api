const express = require("express");
const cartController = require("../controllers/cart-controller");
const authenticated = require("../middlewares/authenticate");
const router = express.Router();

router.post("/createCart", authenticated, cartController.addCartByUserId);
router.get("/fetch", authenticated, cartController.getCartById);
router.patch("/updateCart", authenticated, cartController.updateCart);

module.exports = router;
