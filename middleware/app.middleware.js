const db = require('../utils/database');
module.exports = async function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        var sessionId = Math.floor(Math.random() * 100000000) + 10000000;
        while(true) {
            const rows = await db.load('select count(*) as count from customers where customerID = ' + sessionId);
            if(rows[0].count == 0) {
                break;
            }
            sessionId = Math.floor(Math.random() * 100000000) + 10000000;
        }
        db.load('insert into customers(customerID) values (' + sessionId + ')');
        res.cookie('sessionId', sessionId, {
            signed : true,
            expires: new Date(Date.now() + 60*60*1000*24*1),
            httpOnly: true
        });
        res.locals.isNewSession = true;
    }
    else {
        const rows = await db.load('select count(*) as count from customers where customerID = ' + req.signedCookies.sessionId);
        if(rows[0].count == 0) {
            db.load('insert into customers(customerID) values (' + req.signedCookies.sessionId + ')');
        }
        res.locals.isNewSession = false;
        const list = await db.load('select count(*) as count from customer_product where customerID = ' + req.signedCookies.sessionId);
        res.locals.productInCart = list[0].count;
        if (list[0].count == 0) {
            res.locals.isEmptyCart = true;
        } else {
            res.locals.isEmptyCart = false;
        }
    }
    next();
}