const db = require('../utils/database');

module.exports = async function(req, res, next) {
    const list = await db.load('select count(*) as count from customercart where customerID = ' + req.signedCookies.sessionId);
    req.locals.productInCart = list;
    next();

};