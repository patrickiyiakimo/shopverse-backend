const { json } = require("express");
const db = require("../../config/db");

const getAllProducts = async (req, res) =>{
    try {
        const result = await db.query("SELECT * FROM products"); 
        res.status(200).json(result.rows);   
    } catch (error) {
        console.error(error)
        res.sendStatus(500).json({ message: "Internal server error" });
    }
};

const getProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error)
        res.sendStatus(500).json({message: "Internal server error"})
    }
};

const createProduct = async (req,res) => {
    const {name, description, price, image_url, stock} = req.body;
    if (!name || !description || !price || !image_url || !stock) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const result = await db.query("INSERT INTO products (name, description, price, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, description, price, image_url, stock]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error)
        res.sendStatus(500).json({message: "Internal server error"})
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, description, price, image_url, stock} = req.body;
    if (!name || !description || !price || !image_url || !stock) {
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const result = await db.query("UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *", [name, description, price, image_url, stock, id]);
        if (result.rows.length === 0){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error)
        res.sendStatus(500).json({message: "Internal server error"})
    }
};

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await db.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.error(error)
        res.sendStatus(500).json({message: "Internal server error"})
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};