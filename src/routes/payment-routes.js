const express = require("express");
const stripeController = require("../controllers/stripe-controller");
const router = express.Router();

router.post("/stripe", stripeController.createPayment);
router.post("/transaction", stripeController.createTransaction);
module.exports = router;
