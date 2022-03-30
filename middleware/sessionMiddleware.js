const db = require('../utils/database');

module.exports = async function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        while(true) {
        var sessionId = Math.floor(Math.random() * 1000000) + 100000;
        const list = await db.load('SELECT DISTINCT customerID FROM customers WHERE customerID = ' + sessionId);
            if (list.length === 0) {
                break;
            }
        }
        console.log(sessionId);
        res.cookie('sessionId', sessionId, {
            signed : true 
        });
        const cusId = {
            customerID : sessionId
        }
        const tb = 'customers';
        db.add(tb, cusId);
    }
    next();
}