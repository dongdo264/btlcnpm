const express = require('express');
const db = require('../utils/database');

const router = express.Router();

// xem chi tiết sản phẩm
router.get('/view/:id', async function(req, res) {
    const id = req.params.id;       // lấy ra id
    const sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        return res.redirect('/');
    } else {
        // lấy sản phẩm -> lấy thông tin các size trong kho hàng
        const product = await db.load("SELECT * FROM products p, productimages pm WHERE p.productID = pm.productID and p.status = 'SELLING' and p.productID = " + id);
        const list = await db.load("select count(*) as count from customer_product where customerID = " + sessionId);
        const productDetail = await db.load("select * from productdetails where productID = + " + id + " and quantityInStock > 0");
        if (product.length == 0) {
            return res.redirect('/');
        }
        product[0].outOfStock = false;
        product[0].maxCart = false;
        // check xem giỏ hàng ở mức tối đa chưa ( 5 sản phẩm )
        if (list[0].count >= 5) {
            product[0].maxCart = true;
        }
        // check xem hết hàng chưa (không còn size nào trong kho là hết!)
        if (productDetail.length == 0) {
            product[0].outOfStock = true;
        }
        // lấy ngẫu nhiên 4 sản phẩm random cho khách ở cuối trang
        const related_product = [];
        const list2 = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' and p.productID != " + id);
        for (var i = 0; i < 4; i++) {
            var rand = Math.floor(Math.random()*list2.length);
            related_product.push(list2[rand]);
            list2.splice(rand,1);
        }
        product[0].productDetail = productDetail;
        return res.render('productDetail', {
            categories : product,
            related_product
        });
    }
});

// thêm sản phẩm vào giỏ hàng
router.post('/view/:id', async function(req, res) {
    var size = req.body.variation;                      // lấy size
    var quantity = req.body.quantity;                   // lấy số lượng
    const id = req.params.id;                           // id sản phẩm
    const customerID = req.signedCookies.sessionId;     // id khách hàng
    if (!customerID) {
        return res.redirect('/');
    } else {
        // khi thêm vào giỏ kiểm tra xem trong giỏ ban đầu đã có sản phẩm đó chưa? nếu check có rồi thì tăng số lượng lên
        const product = await db.load("SELECT products.productID, products.productName, products.productPrice, customer_product.size, customer_product.quantity, (products.productPrice*customer_product.quantity) as total FROM products, customer_product WHERE customer_product.productId = products.productID AND customer_product.customerID = " + customerID); 
        var check = true;
        for (var i = 0; i < product.length; i++) {
            if(id == product[i].productID) {
                if (size == product[i].size) {
                    quantity = parseInt(quantity) + parseInt(product[i].quantity);
                    await db.load('update customer_product set quantity = ' + quantity + ' where productId = ' + id + ' and customerID = ' + customerID + ' and size = ' + size);
                    check = false;
                }
            }
        }
        // chưa có thì thêm vào giỏ như bình thường
        if (check) {
            const obj = {
                customerID,
                productId : id,
                size,
                quantity
            }
            const tb = 'customer_product';
            await db.addToCart(tb, obj);
        }
        return res.redirect('/cart');
    }
});


module.exports = router;