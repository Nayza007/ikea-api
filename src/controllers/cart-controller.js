const cartService = require("../services/cart-service");
const createError = require("../utils/create-error");

exports.addCartByUserId = async (req, res, next) => {
  try {
    const product = req.body;
    const user = req.user;
    console.log(product.id, user.id);

    const cart = await cartService.checkCartById(product.id, user.id);

    if (!cart) {
      const createCart = await cartService.createCartById(product.id, user.id);
      res.status(200).json(createCart);
    } else {
      const updateCart = await cartService.updateCartById(
        cart.id,
        cart.quantity
      );
      res.status(200).json(updateCart);
    }
    res.send(cart);
  } catch (error) {
    next(error);
  }
};

exports.getCartById = async (req, res, next) => {
  try {
    const user = req.user;
    const fetchData = await cartService.getCartById(user.id);

    res.status(200).json(fetchData);
  } catch (error) {
    next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const { cartId, quantity, isPlus } = req.body;
    const quantityData = +quantity + +isPlus;
    console.log(quantityData);
    if (quantityData > 0) {
      await cartService.updateCartByCartId(cartId, quantityData);
    } else {
      await cartService.deleteCartByCartId(cartId);
    }

    res.status(200).json();
  } catch (error) {
    next(error);
  }
};
