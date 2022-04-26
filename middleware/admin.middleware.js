const db = require('../utils/database');

module.exports = async function(req, res, next) {
    const rows = await db.load('select status, COUNT(*) as count from orders group by status');
    res.locals.status_orders = rows;
    next();
}