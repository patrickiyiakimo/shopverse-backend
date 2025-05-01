const bcrypt = require("bcrypt");
const pool = require("../../config/db");
require("dotenv").config();
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username and email and password are required' });
    }

    //Duplicate user check
    const userExists = await pool.query('SELECT * from users WHERE username = $1 OR email = $2', [username, email])
    if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, username: user.username }, 'my_jwt_secret', { expiresIn: '1h' });

        res.status(201).json({ message: 'User signed up successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };