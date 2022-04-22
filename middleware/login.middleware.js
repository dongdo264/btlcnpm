const db = require('../utils/database');

module.exports = async function(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/account/login');
    }
    next();
}