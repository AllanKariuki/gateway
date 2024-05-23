const pool = require('../config/db');

const checkRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = await pool.query('SELECT * FROM users INNER JOIN roles ON users.role = roles.id WHERE users.id=$1', [req.user.id]);
            if (!user.rows[0] || user.rows[0].role !== role) {
                return res.status(403).send({ message: 'Forbidden: you do not have the required permissions to make this request'});
            }
            next();
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error'});
        }
    }
}

module.exports = { checkRole }
