const axios = require('axios');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const tokenURL = 'https://sandbox.sasapay.app/api/v1/auth/token/?grant_type=client_credentials';

const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

const requestOptions = {
    method: 'GET',
    headers: {
        Authorization: `Basic ${credentials}`,
    }
}

const getAccessToken = async () => {
    try {
        const response = await axios.get(tokenURL, requestOptions);
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
}

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const response = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
            req.user = response.rows[0];
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized');
        }
    }
    if (!token) {
        res.status(401).send({message: 'Not authorized, no token'});
    }
});

module.exports = {getAccessToken, protect};