const bcrypt = require("bcrypt");
const pool = require("../../config/db");
require("dotenv").config();
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { first_name, last_name, email, phone_number, password} = req.body;

    if (!first_name || !last_name || !email || !phone_number || !password) {
        return res.status(400).json({ message: 'first_name, last_name, email, phone_number and password are required' });
    }

    // Check for duplicate email
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, email, phone_number, hashedPassword]
        );
        const user = result.rows[0];

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User signed up successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };
