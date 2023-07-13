const { sequelize } = require("../models");
const cartService = require("../services/cart-service");
const orderService = require("../services/order-service");
const productService = require("../services/product-service");
const paymentService = require("../services/payment-service");
const createError = require("../utils/create-error");
exports.addCartByUserId = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const product = req.body;
    const user = req.user;
    const cart = await cartService.checkCartById(product.id, user.id);
    const productData = await productService.checkProductQuantityByCart(
      product.id
    );
    if (!cart) {
      const createCart = await cartService.createCartById(product.id, user.id);
      res.status(200).json(createCart);
    }
    const updateCart = await cartService.updateCartById(
      cart.id,
      cart.quantity,
      t
    );
    const cartData = await cartService.checkQuantityProductByCart(
      productData.id,
      user.id,
      productData.quantity,
      t
    );

    if (!cartData) createError("Out of stock", 400);

    await t.commit();
    res.status(200).json(updateCart);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

exports.getCartById = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.id) createError("Unauthenticated", 400);
    const fetchData = await cartService.getCartById(user.id);
    const countCart = await cartService.cartCountByUserId(user.id);
    const totalPrice = fetchData.reduce((acc, cur) => {
      return (acc += +cur.Product.price * +cur.quantity);
    }, 0);
    const isCheckOrder = await orderService.checkOrderByStatus(user.id);
    const newData = {
      product: fetchData,
      countCart,
      totalPrice: totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      orderId: isCheckOrder || null,
    };
    res.status(200).json(newData);
    // res.send(fetchTotalPrice);
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const { cartId, quantity, isPlus } = req.body;
    const quantityData = +quantity + +isPlus;
    if (quantityData > 0) {
      await cartService.updateCartByCartId(cartId, quantityData);
    } else {
      await cartService.deleteCartByCartId(cartId);
    }

    res.status(200).json({ msg: "Update Complete" });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    if (!req.params) createError("Params is required", 400);
    const orderData = await orderService.checkOrderByIds(
      req.params.id,
      req.user.id,
      t
    );
    if (!orderData) createError("Order Not found", 400);
    const orderItemData = await orderService.checkOrderItemByOrderId(
      orderData.id,
      t
    );
    const newOrderItemData = orderItemData.map((el) => {
      return (newObj = {
        productId: el.productId,
        orderId: el.orderId,
        quantity: el.quantity,
      });
    });
    if (orderItemData.length <= 0) createError("OrderItem not found", 400);
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
      const newObj = {
        productId: cur.id,
        quantity: +cur.quantity + +cur.OrderItems[0].quantity,
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
    if (updateProduct.length <= 0) createError("Update product error", 400);
    const deletePayment = await paymentService.deletePaymentByOrderId(
      orderData.id,
      t
    );
    if (deletePayment == 0) createError("Delete payment error", 400);
    const deleteOrderItemData = await orderService.deleteOrderItemByOrderId(
      orderData.id,
      t
    );
    if (deleteOrderItemData == 0) createError("Delete orderItem error", 400);
    const deleteOrder = await orderService.deleteOrder(orderData.id, t);
    if (deleteOrder == 0) createError("Delete order error", 400);
    await t.commit();
    res.status(200).json({ msg: "Delete Complete" });
    // res.status(200).json(orderData);
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
