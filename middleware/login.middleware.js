const db = require('../utils/database');

module.exports = async function(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/account/login');
    }
    else {
        const customerList = await db.load('select * from customers where accessDate <= DATE_ADD(NOW(), INTERVAL -1 DAY)');
        for (var i = 0; i < customerList.length; i++) {
            await db.load('delete from customer_product where customerID = ' + customerList[i].customerID);
            await db.load('delete from customers where customerID = ' + customerList[i].customerID);
        }
        res.locals.adminUser = req.session.adminUser;
    }
    next();
}