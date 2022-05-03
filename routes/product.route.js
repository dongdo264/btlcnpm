const express = require('express');
const db = require('../utils/database');

const router = express.Router();

router.get('/view/:id', async function(req, res) {
    const id = req.params.id;
    const product = await db.load("SELECT * FROM products WHERE productID = " + id);
    const list = await db.load('select count(*) as count from customercart where customerID = ' + req.signedCookies.sessionId);
    const productDetail = await db.load('select * from productdetails where productID = + ' + id + " and quantityInStock != 0");
    product[0].outOfStock = false;
    product[0].maxCart = false;
    if (list[0].count >= 4) {
        product[0].maxCart = true;
    }
    if (productDetail.length == 0) {
        product[0].outOfStock = true;
    }
    product[0].productDetail = productDetail;
    res.render('productDetail', {
        categories : product,
    });
});

router.post('/view/:id', async function(req, res) {
    var size = req.body.variation;
    var quantity = req.body.quantity;
    const id = req.params.id;
    const customerID = req.signedCookies.sessionId;
    const product = await db.load("SELECT products.productID, products.productName, products.productPrice, customercart.size, customercart.quantity, (products.productPrice*customercart.quantity) as total FROM products, customercart WHERE customercart.productId = products.productID AND customercart.customerID = " + customerID);
    
    var check = true;
    for (var i = 0; i < product.length; i++) {
        if(id == product[i].productID) {
            if (size == product[i].size) {
                quantity = parseInt(quantity) + parseInt(product[i].quantity);
                await db.load('update customercart set quantity = ' + quantity + ' where productId = ' + id + ' and customerID = ' + customerID + ' and size = ' + size);
                check = false;
            }
        }
    }
    if (check) {
        const obj = {
            customerID,
            productId : id,
            size,
            quantity
        }
        const tb = 'customercart';
        await db.add(tb, obj);
    }
    res.redirect('/cart');
});


module.exports = router;