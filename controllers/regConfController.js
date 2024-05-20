const asyncHandler = require('express-async-handler')
const { getAccessToken } = require('../middleware/authMiddleware')
const axios = require('axios')

const regConf = asyncHandler(async (req, res) => {
    const token = await getAccessToken()
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(token)
    const data = req.body
    console.log(data)
    try {
        const response = await axios.post('https://sandbox.sasapay.app/api/v1/payments/register-ipn-url/', data, config)
        res.status(200).send({message: response})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error sending payment request'})
    }
})

module.exports = {regConf}