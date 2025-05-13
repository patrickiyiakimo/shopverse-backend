const db = require("../../config/db");

exports.getAllOrders = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM orders");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: "Internal server error" });
    }
};

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: "Internal server error" });
    }
};

exports.createOrder = async (req, res) => {
    const { user_id, product_id, quantity, total_price } = req.body;
    if (!user_id || !product_id || !quantity || !total_price) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const result = await db.query("INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *", [user_id, product_id, quantity, total_price]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: "Internal server error" });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: "Internal server error" });
    }
};