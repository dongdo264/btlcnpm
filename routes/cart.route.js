const express = require('express');
const { add } = require('../utils/database');
const db = require('../utils/database');

const router = express.Router();

// xem giỏ hàng
router.get('/', async function(req, res) {
    var sessionId = req.signedCookies.sessionId;    // id người dùng
    if (!sessionId) {
        return res.redirect('/');
    } else {
    const product = await db.load("SELECT products.productID, products.productName, products.productPrice, customercart.size, customercart.quantity, (products.productPrice*customercart.quantity) as total FROM products, customercart WHERE customercart.productId = products.productID AND customercart.customerID = " + sessionId);
    const maxOrder = await db.load("select count(*) as count from orders where customerID = " + sessionId);
    // xem còn order được nữa không? mỗi khách chỉ được tạo tối đa 2 đơn 1 ngày!
        var isOrder = true;
        if (maxOrder[0].count >= 2) {
            isOrder = false;
        }
        var sum = 0;
        for (var i = 0; i < product.length; i++) {
            sum += product[i].total;
        }
        return res.render('cart', {
        categories : product,
        sum,
        isOrder
        });
    }
});

// xóa bớt sản phẩm khỏi giỏ hàng
router.get('/delete', async function(req, res) {
    const customID = req.signedCookies.sessionId;
    const id = req.query.id;
    const size = req.query.size;
    if (!customID) {
        return res.redirect('/');
    } else {
        await db.deleteProductInCart('customercart', customID, id, size);
        //await db.load('delete from customercart where productId = ' + id + ' and size = ' + size);
        res.redirect('/cart');
    }
});

// gửi đơn hàng đi
router.post('/payment', async function(req, res) {
    // lấy id, tên, đchi, số đt, ghi chú.
    var sessionId = req.signedCookies.sessionId;
    var name = req.body.name;                           
    var address = req.body.address;                     
    var phone = req.body.phone;                        
    var note = req.body.note;
    if (!sessionId) {
        return res.redirect('/');
    } else {
        if (!note) {
            note = 'Không';
        }
        // tạo random 1 mã đơn hàng
        var orderNumber = Math.floor(Math.random() * 100000000) + 10000000;
        while(true) {
            const rows = await db.load('select count(*) as count from orders where orderNumber = ' + orderNumber);
            if(rows[0].count == 0) {
                break;
            }
            orderNumber = Math.floor(Math.random() * 100000000) + 10000000;
        }
        const product = await db.load("SELECT products.productID, products.productPrice, customercart.size, customercart.quantity, (products.productPrice*customercart.quantity) as total FROM products, customercart WHERE customercart.productId = products.productID AND customercart.customerID = " + sessionId);
        await db.load('insert into orders values(' + orderNumber + ', ' + sessionId + ", '"+ name + "', '" + phone + "', '" + address + "',CURDATE(), '" + note + "', 'Đang xử lý')");
        await db.load('SET FOREIGN_KEY_CHECKS = 0');
        for(var i = 0; i < product.length; i++) {
            await db.load('insert into orderdetails values (' + orderNumber + ',' + product[i].productID + ',' + product[i].quantity + ','+ product[i].productPrice + ', ' + product[i].size + ')');
        }
        await db.load('SET FOREIGN_KEY_CHECKS = 1');
        await db.load('delete from customercart where customerID = ' + sessionId);
        res.redirect('/');
    }
});


module.exports = router;