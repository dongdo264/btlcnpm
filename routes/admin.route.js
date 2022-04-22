const express = require('express');

const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    const rows = await db.load('select * from orders');
    res.render('admin', {
        layout : 'admin.main.handlebars',
        rows
    });
});
router.get('/delete', async function(req, res) {
    const id = req.query.id;
    await db.load('SET FOREIGN_KEY_CHECKS = 0');
    await db.load('delete from orderdetails where orderNumber = ' + id);
    await db.load('delete from orders where orderNumber = ' + id);
    await db.load('SET FOREIGN_KEY_CHECKS = 1');
    res.redirect('/admin');
});
router.get('/vieworder/:id', async function(req, res) {
    const id = req.params.id;
    const rows = await db.load('select * from orders where orderNumber = ' + id);
    const order_list = await db.load('select o.productID, o.orderNumber, o.quantity, o.priceEach, p.productID,o.size, p.productName,(o.quantity * o.priceEach) as total from orderdetails as o, products as p where orderNumber = ' + id + ' and o.productID = p.productID');
    res.render('adminviewOrder', {
        layout : 'admin.main.handlebars',
        rows,
        order_list
    });
});
router.post('/vieworder/:id', async function(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    var note = req.body.note;
    if (!note) {
        note = 'Không';
    }
    await db.load("update orders set customerName = '" + name + "', phone = '" + phone + "', address = '" + address + "', comment = '" + note + "' where orderNumber = " + id);
    // const rows = await db.load("select * from orderdetails where orderNumber = " + id);
    // if (rows.length == 1) {
    //     await db.load("update orderdetails set size = " + size + ", quantity = " + quantity + " where orderNumber = " + id + " and productID = " + rows[0].productID + " and size = " + rows[0].size + " and quantity = " + rows[0].quantity);
    // } else {
    //     //var sql = '';
    //     for (var i = 0; i < rows.length; i++) {
    //             //sql += "update orderdetails set size = " + size[i] + ", quantity = " + quantity[i] + " where orderNumber = " + id + " and productID = " + rows[i].productID + " and quantity = " + rows[i].quantity + " and size = " + rows[i].size + ";";
    //             //db.load("update orderdetails set size = " + size[i] + ", quantity = " + quantity[i] + " where productID = " + rows[i].productID + " and quantity = " + rows[i].quantity + " and size = " + rows[i].size);
    //             await db.load("update orderdetails set size = " + size[i] + ", quantity = " + quantity[i] + " where orderNumber = " + id + " and productID = " + rows[i].productID + " and quantity = " + rows[i].quantity + " and size = " + rows[i].size);
    //     }
    //     //db.load(sql);
    // }
    const url = '/admin/vieworder/' + id;
    res.redirect(url);
});

router.get('/delorder', async function(req, res) {
    const productID = req.query.productID;
    const orderNumber = req.query.orderNumber;
    const size = req.query.size;
    await db.load('delete from orderdetails where orderNumber = ' + orderNumber + " and productID = " + productID + " and size = " + size);
    var url = '/admin/vieworder/' + orderNumber;
    res.redirect(url);
});
// router.get('/login', async function(req, res) {
//     res.render('adminLogin',{
//         layout: 'login.handlebars'
//     });
// });
// router.post('/login', async function(req, res) {
//     const username = req.body.username;
//     const password = req.body.password;
//     // var hash = bcrypt.hashSync(password, 8);
//     // console.log(hash);
//     const rows = await db.load('select * from accounts');
//     for (var i = 0;i < rows.length; i++) {
//         if (rows[i].username == username) {
//             if (bcrypt.compare(password, rows[i].password)) {
//                 req.session.isAuthenticated = true;
//                 return res.redirect('/admin');
//             }
//         }
//     }
//     res.redirect('/admin/login');
// });

module.exports = router;