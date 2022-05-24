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
    var check = false;
    // lấy tất cả các account ra để check
    const rows = await db.load('select * from accounts');
    for (var i = 0;i < rows.length; i++) {
        // nếu mà user + pass đúng thì cho true rồi chuyển về trang chủ
        if (rows[i].username == req.body.username) {
            if (bcrypt.compareSync(req.body.password, rows[i].password) === true) {
                req.session.isAuthenticated = true;
                req.session.adminUser = req.body.username;
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
    const user = req.session.adminUser;
    const old = req.body.oldpassword;
    const newpass = req.body.newpassword;
    const confirm = req.body.confirm;
    const rows = await db.load("select * from accounts where username = '" + user + "'");
    if (bcrypt.compareSync(old, rows[0].password) == false || rows.length == 0) {
        return res.render('changepassword',{
            layout: 'login.handlebars',
            err : true,
            msg : 'Không thành công, mật khẩu không chính xác!'
        });
    }
    // hash mật khẩu, đưa vào database
    const pass = bcrypt.hashSync(newpass, 10);
    await db.load("update accounts set password = '" + pass + "' where username = '" + user + "'");
    res.redirect('/admin');
});
router.get('/logout', async function(req, res) {
    req.session.isAuthenticated = false;
    res.redirect('/admin');
});
module.exports = router;