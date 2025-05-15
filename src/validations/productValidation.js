const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    description: Joi.string().trim().min(10).max(500).required(),
    price: Joi.number().positive().precision(2).required(),
    image_url: Joi.string().uri().required(),
    stock: Joi.number().integer().min(0).required()
});

const orderSchema = Joi.object({
    user_id: Joi.number().integer().positive().required(),
    product_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().min(1).required(),
    total_price: Joi.number().positive().precision(2).required()
});

const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateOrder = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateOrderId = (req, res, next) => {
    const { error } = idParamSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateProductId = (req, res, next) => {
    const { error } = idParamSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateProduct,
    validateOrder,
    validateOrderId,
    validateProductId
};
