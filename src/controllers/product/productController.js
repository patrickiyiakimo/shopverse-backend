const { json } = require("express");
const db = require("../../config/db");

exports.getAllProducts = async (req, res) =>{
    try {
        const result = await db.query("SELECT * FROM products"); 
        res.status(200).json(result.rows);   
    } catch (error) {
        console.error(error)
        res.sendStatus(500).json({ message: "Internal server error" });
    }
};

exports.getProductById = async (req, res) => {
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