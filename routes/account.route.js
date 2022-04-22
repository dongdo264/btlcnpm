const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../utils/database');

const router = express.Router();

router.get('/login', async function(req, res) {
    res.render('adminLogin',{
        layout: 'login.handlebars'
    });
});
router.post('/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    var check = false;
    const rows = await db.load('select * from accounts');
    for (var i = 0;i < rows.length; i++) {
        if (rows[i].username == username) {
            if (bcrypt.compareSync(password, rows[i].password) === true) {
                req.session.isAuthenticated = true;
                check = true;
                break;
            }
        }
    }
    if (check) {
        return res.redirect('/admin');
    } else {
        return res.render('adminLogin',{
            layout: 'login.handlebars',
            err : true,
            msg : 'Tài khoản hoặc mật khẩu không chính xác'
        });
    }
});
module.exports = router;