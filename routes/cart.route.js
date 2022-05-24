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
    const product = await db.load("SELECT p.productID, p.productName, p.productPrice, c.size, c.quantity, (p.productPrice*c.quantity) as total, pm.main FROM products p, customer_product c, productimages pm WHERE c.productId = p.productID and c.productId = pm.productID AND c.customerID = " + sessionId);
    //const image = await db.load('select main from productimages where productID = ' + sessionId);
    const maxOrder = await db.load("select count(*) as count from orders where customerID = " + sessionId);
    //console.log(image);
    //product[0].main = image[0].main;
    // xem còn order được nữa không? mỗi khách chỉ được tạo tối đa 2 đơn 1 ngày!
        var isOrder = true;
        if (maxOrder[0].count >= 3) {
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
        await db.deleteProductInCart('customer_product', customID, id, size);
        //await db.load('delete from customer_product where productId = ' + id + ' and size = ' + size);
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
        // lấy ra các sản phẩm khách để trong giỏ
        const product = await db.load("SELECT products.productID, products.productPrice, customer_product.size, customer_product.quantity, (products.productPrice*customer_product.quantity) as total FROM products, customer_product WHERE customer_product.productId = products.productID AND customer_product.customerID = " + sessionId);
        await db.load('insert into orders values(' + orderNumber + ', ' + sessionId + ", '"+ name + "', '" + phone + "', '" + address + "',NOW(), '" + note + "', 'Đang xử lý')");
        await db.load('SET FOREIGN_KEY_CHECKS = 0');
        // đưa sản phẩm khách để trong giỏ vào chi tiết đơn hàng
        for(var i = 0; i < product.length; i++) {
            await db.load('insert into orderdetails values (' + orderNumber + ',' + product[i].productID + ',' + product[i].quantity + ','+ product[i].productPrice + ', ' + product[i].size + ')');
        }
        await db.load('SET FOREIGN_KEY_CHECKS = 1');
        // xóa hết dữ liệu trong giỏ hàng
        await db.load('delete from customer_product where customerID = ' + sessionId);
        res.redirect('/');
    }
});


module.exports = router;