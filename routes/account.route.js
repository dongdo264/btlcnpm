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

router.get('/changepassword', async function(req, res) {
    res.render('changepassword',{
        layout: 'login.handlebars'
    });
});
router.post('/changepassword', async function(req, res) {
    const old = req.body.oldpassword;
    const newpass = req.body.newpassword;
    const confirm = req.body.confirm;
    const rows = await db.load('select * from accounts');
    if (newpass.length < 5) {
        return res.render('changepassword',{
            layout: 'login.handlebars',
            err : true,
            msg : 'Mật khẩu chứa ít nhất 5 kí tư'
        });
    }
    if (newpass != confirm || bcrypt.compareSync(old, rows[0].password) == false) {
        return res.render('changepassword',{
            layout: 'login.handlebars',
            err : true,
            msg : 'Không thành công, vui lòng xem lại'
        });
    }
    var pass = bcrypt.hashSync(newpass, 8);
    await db.load("update accounts set password = '" + pass + "'");
    res.redirect('/admin');
});
router.get('/logout', async function(req, res) {
    req.session.isAuthenticated = false;
    res.redirect('/admin');
});
module.exports = router;