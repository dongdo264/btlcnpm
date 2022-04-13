const express = require('express');
const { add } = require('../utils/database');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    const product = await db.load("SELECT products.productID, products.productName, products.productPrice, customercart.size, customercart.quantity, (products.productPrice*customercart.quantity) as total FROM products, customercart WHERE customercart.productId = products.productID AND customercart.customerID = " + sessionId);
    var sum = 0;
    for (var i = 0; i < product.length; i++) {
        sum += product[i].total;
    }
    res.render('cart', {
       categories : product,
       sum 
    });
});

router.get('/delete', async function(req, res) {
    const id = req.query.id;
    const size = req.query.size;
    db.load('delete from customercart where productId = ' + id + ' and size = ' + size);
    res.redirect('/cart');
});

router.post('/payment', async function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var note = req.body.note;
    if (!note) {
        note = 'Không';
    }
    
    const product = await db.load("SELECT products.productID, products.productPrice, customercart.size, customercart.quantity, (products.productPrice*customercart.quantity) as total FROM products, customercart WHERE customercart.productId = products.productID AND customercart.customerID = " + sessionId);
    db.load('insert into orders(customerID,customerName,phone,address,orderDate,comment) values(' + sessionId + ", '"+ name + "', '" + phone + "', '" + address + "',CURDATE(), '" + note + "')");
    const tmp = await db.load('select * from orders where customerID = ' + sessionId + ' order by orderNumber desc limit 1');
    var code = await db.load('select * from orders where customerID = ' + sessionId + ' order by orderNumber desc limit 1');
    for(var i = 0; i < product.length; i++) {
        db.load('insert into orderdetails values (' + code[0].orderNumber + ',' + product[i].productID + ',' + product[i].quantity + ','+ product[i].productPrice + ')');
        var quantity = await db.load('select quantityOrdered from products where productID = ' + product[i].productID);
        var sl = parseInt(quantity[0].quantityOrdered) + parseInt(product[i].quantity);
        db.load('update products set quantityOrdered = ' + sl + ' where productID = ' + product[i].productID);
    }
    db.load('delete from customercart where customerID = ' + sessionId);
    res.redirect('/');

});


module.exports = router;