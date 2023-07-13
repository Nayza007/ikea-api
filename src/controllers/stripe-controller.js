const express = require("express");
const Stripe = require("stripe");
const createError = require("../utils/create-error");
const stripe = Stripe(process.env.STRIPE_KEY);
const cartService = require("../services/cart-service");
const orderService = require("../services/order-service");
const productService = require("../services/product-service");
const paymentService = require("../services/payment-service");
const { sequelize } = require("../models");
exports.createPayment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const totalPrice = parseInt(req.body.totalPrice.replace(/,/g, ""));
    const orderData = await orderService.createOrderByUserId(
      user.id,
      totalPrice,
      t
    );
    if (!orderData) createError("Create error", 400);
    const cartData = await cartService.checkCartByUserId(user.id, t);
    const newCartData = cartData.reduce((acc, cur) => {
      const newObj = {
        productId: cur.productId,
        quantity: cur.quantity,
        userId: cur.userId,
        orderId: orderData.id,
      };
      acc.push(newObj);
      return acc;
    }, []);
    if (!cartData) createError("Cart not found", 400);
    const orderItemData = await orderService.createOrderItem(newCartData, t);
    const newOrderItemData = orderItemData.map((el) => {
      return (newObj = {
        productId: el.productId,
        orderId: el.orderId,
        quantity: el.quantity,
      });
    });
    if (orderItemData.length <= 0) createError("Create error", 400);
    const checkProductData = await Promise.all(
      newOrderItemData.map(async (item) => {
        return await productService.getOneProduct(
          item.productId,
          item.orderId,
          t
        );
      })
    );
    const newProductData = checkProductData.reduce((acc, cur) => {
      if (+cur.quantity - +cur.OrderItems[0].quantity <= -1)
        createError("Out stock", 400);
      const newObj = {
        productId: cur.id,
        quantity: +cur.quantity - +cur.OrderItems[0].quantity,
      };

      acc.push(newObj);
      return acc;
    }, []);

    const updateProduct = await Promise.all(
      newProductData.map(async (el) => {
        return await productService.updateProductByQuantity(
          el.productId,
          el.quantity,
          t
        );
      })
    );
    if (updateProduct.length <= 0) createError("Update fail", 400);
    const paymentData = await paymentService.createPaymentByOrderId(
      orderData.id,
      t
    );
    if (!paymentData) createError("Create payment error", 400);
    const line_items = req.body.product.map((item) => {
      return {
        price_data: {
          currency: "THB",
          product_data: {
            name: item.Product?.productName,
            images: [item.Product?.productImage],
            description: item.Product?.detail,
            metadata: {
              id: item.productId,
              order: orderData.id,
            },
          },
          unit_amount: item.Product.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["TH"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "THB",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
    });
    await t.commit();
    res.status(200).json(session);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
exports.createTransaction = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const sessionId = req.query;
    if (!sessionId) createError("Session id is required", 400);
    const session = await stripe.checkout.sessions.retrieve(
      sessionId.session_id
    );
    const newSessionData = {
      totalPrice: (session.amount_total / 100)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      city: session.customer_details.address?.city,
      country: session.customer_details.address?.country,
      PostalCode: session.customer_details.address?.postal_code,
    };
    const checkOrderData = await orderService.checkOrderByUserIdAndTotalPrice(
      user.id,
      +session.amount_total / 100,
      t
    );

    if (!checkOrderData) createError("Not Found", 400);
    const [paymentData] = await paymentService.updatePaymentByStatus(
      checkOrderData.id,
      t
    );

    if (paymentData == 0) createError("Payment Update fail", 400);
    const [updateOrderData] = await orderService.checkUpdateOrder(
      checkOrderData.id,
      t
    );
    if (updateOrderData == 0) createError("Order Update fail", 400);
    const cardData = await cartService.checkCartByUserId(user.id, t);
    if (cardData.length <= 0) createError("Cart not found", 400);
    const deleteCartData = await Promise.all(
      cardData.map(async (item) => {
        return await cartService.deleteCartByCartIdTransaction(item.id, t);
      })
    );

    await t.commit();
    res.status(200).json(newSessionData);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
