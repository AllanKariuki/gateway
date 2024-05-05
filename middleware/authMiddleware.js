const axios = require('axios');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

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

module.exports = getAccessToken;