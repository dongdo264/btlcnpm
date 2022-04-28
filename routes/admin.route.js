const express = require('express');

const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    const rows = await db.load('select * from orders order by orderDate desc');
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
    var sum = 0;
    for (var i = 0;i < order_list.length; i++) {
        sum += order_list[i].total;
    }
    var sta = 0;
    const stt = rows[0].status;
    if (stt == 'Đang xử lý') {
        sta = 1;
    } else if (stt == 'Đang giao hàng') {
        sta = 2;
    } else if (stt == 'Đã hoàn tất') {
        sta = 3;
    } else if (stt == 'Bị hủy') {
        sta = 4;
    }
    rows[0].sta = sta;
    res.render('adminviewOrder', {
        layout : 'admin.main.handlebars',
        rows,
        order_list,
        sum
    });
});
router.post('/vieworder/:id', async function(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    var note = req.body.note;
    const stt = req.body.stt;
    var status = '';
    if (stt == 1) {
        status = 'Đang xử lý';
    } else if (stt == 2) {
        status = 'Đang giao hàng';
    } else if (stt == 3) {
        status = 'Đã hoàn tất';
        const rows = await db.load('select * from orderdetails where orderNumber = ' + id);
        for (var i = 0; i < rows.length; i++) {
            await db.load('update products set quantityInStock = quantityInStock - ' + rows[i].quantity + ", quantityOrdered = quantityOrdered + " + rows[i].quantity + " where productID = " + rows[i].productID);
        }
    } else if (stt == 4) {
        status = 'Bị hủy';
    }
    if (!note) {
        note = 'Không';
    }
    await db.load("update orders set customerName = '" + name + "', phone = '" + phone + "', address = '" + address + "', comment = '" + note + "', status = '" + status + "' where orderNumber = " + id);
    if (status == 'Đã hoàn tất') {

    }
    //const url = '/admin/vieworder/' + id;
    res.redirect('/admin');
});

router.get('/delorder', async function(req, res) {
    const productID = req.query.productID;
    const orderNumber = req.query.orderNumber;
    const size = req.query.size;
    await db.load('delete from orderdetails where orderNumber = ' + orderNumber + " and productID = " + productID + " and size = " + size);
    var url = '/admin/vieworder/' + orderNumber;
    res.redirect(url);
});
router.get('/vieworder', async function(req, res) {
    const query = req.query.q;
    const rows = await db.load("select * from orders where status = '" + query + "'");
    res.render('admin', {
        layout : 'admin.main.handlebars',
        rows
    });
});
router.get('/search', async function(req, res) {
    const query = req.query.q;
    const rows = await db.load("select * from orders where customerName LIKE '%" + query + "%' OR phone LIKE '%" + query + "%'");
    res.render('admin', {
        layout : 'admin.main.handlebars',
        rows
    });
});
module.exports = router;