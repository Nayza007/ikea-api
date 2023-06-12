const Joi = require("joi");
const validate = require("./validate");
const ProductSchema = Joi.object({
  productName: Joi.string()
    .required()
    .messages({ "string.empty": "Product name is required" }),
  detail: Joi.string()
    .required()
    .messages({ "string.empty": "Detail is required" }),
  quantity: Joi.string().trim().required().messages({
    "string.empty": "Quantity is required",
  }),
  price: Joi.string().trim().required().messages({
    "string.empty": "Price is required",
  }),
  type: Joi.string().trim().required().messages({
    "string.empty": "Type is required",
  }),
});

exports.validateProduct = validate(ProductSchema);
