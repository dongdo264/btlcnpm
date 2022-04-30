const db = require('../utils/database');
var sessionStorage = require('sessionstorage');
module.exports = async function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        var sessionId = Math.floor(Math.random() * 100000000) + 10000000;
        res.cookie('sessionId', sessionId, {
            signed : true,
            expires: new Date(Date.now() + 60*60*1000*24*3)
        });
        res.locals.isNewSession = true;
    }
    else {
        res.locals.isNewSession = false;
        const list = await db.load('select count(*) as count from customercart where customerID = ' + req.signedCookies.sessionId);
        res.locals.productInCart = list[0].count;
        if (list[0].count == 0) {
            res.locals.isEmptyCart = true;
        } else {
            res.locals.isEmptyCart = false;
        }
    }

    next();
}