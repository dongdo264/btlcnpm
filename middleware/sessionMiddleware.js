const db = require('../utils/database');

module.exports = async function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        var sessionId = Math.floor(Math.random() * 10000000) + 1000000;
        console.log(sessionId);
        res.cookie('sessionId', sessionId, {
            signed : true 
        });
    }
    next();
}