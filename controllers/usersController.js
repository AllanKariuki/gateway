const pool = require('../config/db');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const createUser = asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        res.status(400).send({message: 'Please add all fields'});
    }

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [data.email]);

    if (userExists.rows.length > 0) {
        res.status(400).send({message: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt)
    try {
        const queryText = `INSERT INTO users(email, password) VALUES($1, $2) RETURNING *`;
        const values = [data.email, hashedPassword];
        const response = await pool.query(queryText, values);
        res.status(201).send({message: "User created successfully", data: response.rows[0]});
    } catch(error) {
        res.status(500).send({message: 'Error creating user', error: error.message});
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        res.status(400).send({message: 'Please add all fields'});
    }

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [data.email]);
    const userData = user.rows[0];

    if(user.rows.length === 0) {
        res.status(400).send({message: 'Invalid credentials'});
    }

    if(user && (await bcrypt.compare(data.password, userData.password))) {
        res.json({
            _id: userData.id,
            email: userData.email,
            token: generateToken(userData.id)
        });
    } else {
        res.status(400).send({message: 'Invalid credentials'});
    }

})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const getMe = asyncHandler(async (req, res) => {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    res.status(200).send({message: 'User retrieved successfully', data: user.rows[0]});
})

module.exports = { createUser, loginUser, getMe }
