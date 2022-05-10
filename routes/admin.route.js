const express = require('express');

const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    var status = req.query.status;
    var day = req.query.day;
    if (!status) {
        status = "";
    }
    var rows;
    if (!day || day == 'all') {
        day = "all";
        rows = await db.load("select * from orders where status LIKE '%" + status + "%' order by orderDate desc");
    } else if (day == 'today') {
        rows = await db.load("select * from orders where status LIKE '%" + status + "%' and DAY(orderDate) = DAY(CURDATE()) order by orderDate desc");
    } else if (day == '7day') {
        rows = await db.load("select * from orders where status LIKE '%" + status + "%' and orderDate >= DATE_ADD(CURDATE(), INTERVAL -7 DAY) order by orderDate desc");
    }
    res.render('admin', {
        layout : 'admin.main.handlebars',
        rows,
        status,
        day
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
    var isUpdate = true;
    const rows = await db.load('select * from orders where orderNumber = ' + id);
    const order_list = await db.load('select o.productID, o.orderNumber, o.quantity, o.priceEach, p.productID,o.size, p.productName,(o.quantity * o.priceEach) as total from orderdetails as o, products as p where orderNumber = ' + id + ' and o.productID = p.productID');
    for (var i = 0; i < order_list.length; i++) {
        const stt = await db.load('select * from productdetails where productID = ' + order_list[i].productID + " and size = " + order_list[i].size);
        order_list[i].status = 'Đủ hàng';
        if (order_list[i].quantity > stt[0].quantityInStock) {
            order_list[i].danger = true;
            order_list[i].status = 'Không đủ hàng';
            isUpdate = false;
        }
    }
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
        sum,
        isUpdate
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
        const check = await db.load("select * from orders where orderNumber = " + id);
        if (check[0].status != status) {
            const rows = await db.load('select * from orderdetails where orderNumber = ' + id);
            for (var i = 0; i < rows.length; i++) {
                await db.load('update productdetails set quantityInStock = quantityInStock - ' + rows[i].quantity  + " where productID = " + rows[i].productID + " and size = " + rows[i].size);
                await db.load('update products set quantitySold = quantitySold + ' + rows[i].quantity + " where productID = " + rows[i].productID);
            }
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
// router.get('/vieworder', async function(req, res) {
//     const query = req.query.q;
//     const rows = await db.load("select * from orders where status = '" + query + "'");
//     res.render('admin', {
//         layout : 'admin.main.handlebars',
//         rows
//     });
// });
router.get('/search', async function(req, res) {
    const query = req.query.q;
    const rows = await db.load("select * from orders where customerName LIKE '%" + query + "%' OR phone LIKE '%" + query + "%'");
    res.render('admin', {
        layout : 'admin.main.handlebars',
        rows
    });
});


router.get('/addNewProd', async function(req, res) {
    res.render('adminAddNewP', {
        layout : 'admin.main.handlebars'
    });
});

router.post('/addNewProd', async function(req, res) {
    const name = req.body.nameP;
    const brand = req.body.brandP;
    const desc = req.body.descP;
    const price = req.body.priceP;
    const style = req.body.styleP;

    await db.load("insert into products (productName, productBrand, productDescription, productPrice, style) values ('" + name + "', '" + brand + "', '" + desc + "', '" + price + "', '" + style + "') ");
    
    const url = '/admin/addNewProd';
    res.redirect(url);
});

router.get('/editProduct', async function(req, res) {
    const list = await db.load('select * from products');
    res.render('adminEdit', {
        layout : 'admin.main.handlebars',
        categories : list
    });
});

router.get('/editProduct/:id' ,async function(req, res) {
    const id = req.params.id;
    const rows = await db.load('select * from products where productID = ' + id);
    const size_ = [];
    const rows_size = await db.load('select size, quantityInStock from productdetails where productID = ' + id)
    for (var j = 38; j <= 43; j++) {
        var check = true;
        for (var i = 0; i<rows_size.length;i++) {
            if (rows_size[i].size == j) {
                const item = {
                    size : j,
                    quantity : rows_size[i].quantityInStock
                }
                size_.push(item);
                check = false;
                break;
            }
        }
        if (check) {
            const item = {
                size : j,
                quantity : 0
            }
            size_.push(item);
        }
    }
    rows[0].list_size = size_;
    res.render('adminAlterProd', {
        layout : 'admin.main.handlebars',
        categories : rows
    });
});


router.post('/editProduct/:id', async function(req, res) {
    const id = req.params.id;
    const productName = req.body.editNameP;
    const productBrand = req.body.editBrandP;
    const productDescription = req.body.editDescP;
    const productPrice = req.body.editPriceP;
    const style = req.body.editStyleP;
    const size38 = req.body.size38;
    const size39 = req.body.size39;
    const size40 = req.body.size40;
    const size41 = req.body.size41;
    const size42 = req.body.size42;
    const size43 = req.body.size43;

    await db.load('SET FOREIGN_KEY_CHECKS = 0');
    await db.load('delete from productdetails where productID = ' + id);
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 38, '" + size38 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 39, '" + size39 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 40, '" + size40 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 41, '" + size41 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 42, '" + size42 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 43, '" + size43 + "') ");
    await db.load("update products set productName = '" + productName + "', productBrand = '" + productBrand + "', productDescription = '" + productDescription + "', productPrice = '" + productPrice + "', style = '" + style + "' where productID = " + id); 
    await db.load('SET FOREIGN_KEY_CHECKS = 1');
    const url = '/admin/editProduct';
    res.redirect(url);
});

router.get('/delproduct/:id', async function(req, res) {
    const id = req.params.id;
    await db.load('delete from products where productID = ' + id );
    var url = '/admin/editProduct';
    res.redirect(url);
});

router.get('/addquantity/:id', async function(req, res) {
    const id = req.params.id;
    const rows = await db.load('select * from products where productID = ' + id);
    const size_ = [];
    const rows_size = await db.load('select size, quantityInStock from productdetails where productID = ' + id)
    for (var j = 38; j <= 43; j++) {
        var check = true;
        for (var i = 0; i<rows_size.length;i++) {
            if (rows_size[i].size == j) {
                const item = {
                    size : j,
                    quantity : rows_size[i].quantityInStock
                }
                size_.push(item);
                check = false;
                break;
            }
        }
        if (check) {
            const item = {
                size : j,
                quantity : 0
            }
            size_.push(item);
        }
    }
    rows[0].list_size = size_;
    res.render('adminAddQUantity', {
        layout : 'admin.main.handlebars',
        categories : rows
    });
});

router.post('/addquantity/:id', async function(req, res) {
    const id = req.params.id;
    const size38 = req.body.size38;
    const size39 = req.body.size39;
    const size40 = req.body.size40;
    const size41 = req.body.size41;
    const size42 = req.body.size42;
    const size43 = req.body.size43;

    await db.load('SET FOREIGN_KEY_CHECKS = 0');
    await db.load('delete from productdetails where productID = ' + id);
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 38, '" + size38 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 39, '" + size39 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 40, '" + size40 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 41, '" + size41 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 42, '" + size42 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 43, '" + size43 + "') ");
    await db.load('SET FOREIGN_KEY_CHECKS = 1');
    const url = '/admin/editProduct';
    res.redirect(url);
});

module.exports = router;