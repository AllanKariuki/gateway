const express = require('express');
const sendb2bPayment = require('../controllers/b2bController');
const router = express.Router();

router.route("/b2b/").get(sendb2bPayment.sendb2bPayment);
// router.get("/b2b/", (req, res) => {
//     res.status(200).send({message: 'API is working'});
// });

// router.get("/b2b/", sendb2bPayment.sendb2bPayment);

module.exports = router;

