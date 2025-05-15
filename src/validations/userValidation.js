const db = require("../config/db");
const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    role: Joi.string().valid("user", "admin").default("user"),
});
const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
const validateUserId = (req, res, next) => {
    const { error } = idParamSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
const checkDuplicateEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const checkUserExists = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = {
    validateUser,
    validateUserId,
    checkDuplicateEmail,
    checkUserExists
};