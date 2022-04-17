const express = require('express');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    const rows = await db.load('select * from orders');
    res.render('admin', {
        rows
    });
});
router.get('/delete', async function(req, res) {
    const id = req.query.id;
    db.load('SET FOREIGN_KEY_CHECKS = 0');
    db.load('delete from orderdetails where orderNumber = ' + id);
    db.load('delete from orders where orderNumber = ' + id);
    db.load('SET FOREIGN_KEY_CHECKS = 1');
    res.redirect('/admin');
})

module.exports = router;