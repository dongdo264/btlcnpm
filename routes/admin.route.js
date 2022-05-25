const express = require('express');

const db = require('../utils/database');

const router = express.Router();

const fs = require('fs');
const path = require('path');

var multer = require('multer');
const { route } = require('express/lib/application');


router.get('/', async function(req, res) {
    var status = req.query.status;
    var day = req.query.day;
    if (!status) {
        status = "";
    }
    var rows;
    var checked_status = 0;
    if (status == 'Đang xử lý') {
        checked_status = 1;
    } else if (status == 'Đang giao hàng') {
        checked_status = 2;
    } else if (status == 'Đã hoàn tất') {
        checked_status = 3;
    } else if (status == 'Bị hủy') {
        checked_status = 4;
    }
    if (!day || day == 'all') {
        day = "all";
        rows = await db.load("select * from orders where status LIKE '%" + status + "%' order by orderDate asc");
    } else if (day == 'today') {
        rows = await db.load("select * from orders where status LIKE '%" + status + "%' and CAST(orderDate AS DATE) = CURDATE() order by orderDate asc");
    } else if (day == '7day') {
        rows = await db.load("select * from orders where status LIKE '%" + status + "%' and orderDate >= DATE_ADD(CURDATE(), INTERVAL -7 DAY) order by orderDate asc");
    }
    res.render('admin', {
        layout : 'admin.main.handlebars',
        rows,
        empty : rows.length == 0,
        status,
        day,
        checked_status
    });
});

// xóa đơn hàng
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
    const order_list = await db.load('select o.productID, o.orderNumber, o.quantity, o.priceEach, p.productID,o.size, p.productName,(o.quantity * o.priceEach) as total, pm.main from orderdetails as o, products as p, productimages as pm where orderNumber = ' + id + ' and o.productID = p.productID and pm.productID = o.productID');
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
        isUpdate = false;
    } else if (stt == 'Bị hủy') {
        sta = 4;
    }
    rows[0].sta = sta;
    res.render('adminviewOrder', {
        layout : 'admin.main.handlebars',
        rows,
        order_list,
        sum,
        isUpdate,
        adminSearchFromOrder: true,
        orderID : id
    });
});

// cập nhật đơn hàng
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
            const rows_ = await db.load('select * from productdetails where quantityInStock <= 0');
            await db.load('SET FOREIGN_KEY_CHECKS = 0');
            for (var i = 0; i < rows_.length; i++) {
                await db.load('delete from customer_product where productId = ' + rows_[i].productID + ' and size = ' + rows_[i].size);
            }
            await db.load('SET FOREIGN_KEY_CHECKS = 0');
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

router.get('/vieworder/:id/search', async function(req, res) {
    const id = req.params.id;
    const q = req.query.q;
    var rows;
    if (!isNaN(parseFloat(q)) && !isNaN(q - 0)) {
        rows = await db.load("select p.*, pm.main, " + id + " as orderID from products p inner join productimages pm on p.productID = pm.productID where p.status ='SELLING' and p.productID = " + q);
    } else {
        rows = await db.load("select p.*, pm.main, " + id + " as orderID from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' and p.productName LIKE '%" + q + "%'");
    }
    res.render('adminEdit', {
        layout : 'admin.main.handlebars',
        categories: rows,
        adminSearchFromOrder: true,
        orderID : id
    });

});

router.get('/vieworder/:id/product/:productID', async function(req, res) {
    const id = req.params.id;
    const pID = req.params.productID;
    const product = await db.load("SELECT * FROM products p, productimages pm WHERE p.productID = pm.productID and p.status = 'SELLING' and p.productID = " + pID);
    const productDetail = await db.load("select * from productdetails where productID = + " + pID + " and quantityInStock != 0");
    if (productDetail.length == 0) {
        product[0].outOfStock = true;
    }
    product[0].productDetail = productDetail;
    product[0].adminSearchFromOrder = true;
    product[0].orderID = id;
    product[0].maxCart = false;
    res.render('productDetail', {
        categories: product,
    });

});

// thêm sản phẩm vào đơn hàng
router.post('/vieworder/:id/product/:productID', async function(req, res) {
    const id = req.params.id;
    var size = req.body.variation;                      // lấy size
    var quantity = req.body.quantity;
    const pID = req.params.productID;
    const product = await db.load('select * from products where productID = ' + pID);
    const productInOrder = await db.load('select * from orderdetails where orderNumber = ' + id);
    var check = true;
    for (var i = 0; i < productInOrder.length; i++) {
        if(pID == productInOrder[i].productID) {
            if (size == productInOrder[i].size) {
                quantity = parseInt(quantity) + parseInt(productInOrder[i].quantity);
                await db.load('update orderdetails set quantity = ' + quantity + ' where productID = ' + pID + ' and orderNumber = ' + id + ' and size = ' + size);
                check = false;
            }
        }
    }
    if (check) {
        await db.load('SET FOREIGN_KEY_CHECKS = 0');
        await db.load('insert into orderdetails values(' + id + ", " + pID +', ' + quantity + ', ' + product[0].productPrice + ', ' + size + ')');
        await db.load('SET FOREIGN_KEY_CHECKS = 1');
    }
    const url = '/admin/vieworder/' + id;
    res.redirect(url);

});

// xóa sản phẩm trong đơn hàng
router.get('/delorder', async function(req, res) {
    const productID = req.query.productID;
    const orderNumber = req.query.orderNumber;
    const size = req.query.size;
    await db.load('delete from orderdetails where orderNumber = ' + orderNumber + " and productID = " + productID + " and size = " + size);
    var url = '/admin/vieworder/' + orderNumber;
    res.redirect(url);
});

router.get('/search', async function(req, res) {
    const query = req.query.q;
    const rows = await db.load("select * from orders where customerName LIKE '%" + query + "%' OR phone LIKE '%" + query + "%'");
    res.render('admin', {
        layout : 'admin.main.handlebars',
        rows
    });
});

router.get('/addNewProd', async function(req, res) {
    const list_size = [];
    for (var j = 37; j <= 45; j++) {
        const item = {
            size : j,
            quantity : 0
        }
        list_size.push(item);
    }
    res.render('adminAddNewP', {
        layout : 'admin.main.handlebars',
        adminSearchProduct : true,
        list_size
    });
});

// thêm sản phẩm mới
router.post('/addNewProd', async function(req, res) {
    const name = req.body.nameP;
    const brand = req.body.brandP;
    const desc = req.body.descP;
    const price = req.body.priceP;
    const style = req.body.styleP;
    const size37 = req.body.size37;
    const size38 = req.body.size38;
    const size39 = req.body.size39;
    const size40 = req.body.size40;
    const size41 = req.body.size41;
    const size42 = req.body.size42;
    const size43 = req.body.size43;
    const size44 = req.body.size44;
    const size45 = req.body.size45;
    const check = await db.load("select max(productID) as id from products");
    const id = check[0].id + 1;
    // thêm size vào bảng details nè!
    await db.load('SET FOREIGN_KEY_CHECKS = 0');
    await db.load("insert into products (productID, productName, productBrand, productDescription, productPrice, style) values (" + id + ",'" + name + "', '" + brand + "', '" + desc + "', '" + price + "', '" + style + "') ");  
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 37, '" + size37 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 38, '" + size38 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 39, '" + size39 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 40, '" + size40 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 41, '" + size41 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 42, '" + size42 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 43, '" + size43 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 44, '" + size44 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 45, '" + size45 + "') ");
    await db.load("insert into productimages(productID) values(" + id + ')');
    await db.load('SET FOREIGN_KEY_CHECKS = 1');
    const url = '/admin/editProduct/' + id;
    res.redirect(url);
});

// xem danh sách sản phẩm
router.get('/editProduct', async function(req, res) {
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
    var list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING'");
    const numberOfProduct = list.length;
    const limit = 12;
    var numberPage = parseInt(numberOfProduct) / limit;
    if (numberPage != parseInt(numberPage)) {
        numberPage += 1;
    }
    const offset = (parseInt(page) - 1) * limit;
    var page_number = [];
    for (var i = 1; i <= numberPage; i++) {
        const item = {
            value : i,
            active: i == page
        }
        page_number.push(item);
    }
    list =  await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' limit 12 offset " + offset);
    res.render('adminEdit', {
        layout : 'admin.main.handlebars',
        categories : list,
        adminSearchProduct : true,
        page_number
    });
});

// vào xem thông tin sản phẩm
router.get('/editProduct/:id' ,async function(req, res) {
    const id = req.params.id;
    const rows = await db.load("select * from products where status ='SELLING' and productID = " + id);
    rows[0].checked_brand = 0;
    if (rows[0].productBrand == 'Adidas') {
        rows[0].checked_brand = 1;
    } else if (rows[0].productBrand == 'Mizuno') {
        rows[0].checked_brand = 2;
    } else if (rows[0].productBrand == 'Puma') {
        rows[0].checked_brand = 3;
    } else if (rows[0].productBrand == 'Kamito') {
        rows[0].checked_brand = 4;
    }
    const size_ = [];
    const rows_size = await db.load('select size, quantityInStock from productdetails where productID = ' + id)
    for (var j = 37; j <= 45; j++) {
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
        categories : rows,
        adminSearchProduct : true
    });
});

// chỉnh sửa thông tin sản phẩm
router.post('/editProduct/:id', async function(req, res) {
    const id = req.params.id;
    const productName = req.body.editNameP;
    const productBrand = req.body.editBrandP;
    const productDescription = req.body.editDescP;
    const productPrice = req.body.editPriceP;
    const style = req.body.editStyleP;
    const size37 = req.body.size37;
    const size38 = req.body.size38;
    const size39 = req.body.size39;
    const size40 = req.body.size40;
    const size41 = req.body.size41;
    const size42 = req.body.size42;
    const size43 = req.body.size43;
    const size44 = req.body.size44;
    const size45 = req.body.size45;
    await db.load('SET FOREIGN_KEY_CHECKS = 0');
    await db.load('delete from productdetails where productID = ' + id);
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 37, '" + size37 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 38, '" + size38 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 39, '" + size39 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 40, '" + size40 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 41, '" + size41 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 42, '" + size42 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 43, '" + size43 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 44, '" + size44 + "') ");
    await db.load("insert into productdetails (productID, size, quantityInStock) values ('" + id + "', 45, '" + size45 + "') ");
    await db.load("update products set productName = '" + productName + "', productBrand = '" + productBrand + "', productDescription = '" + productDescription + "', productPrice = '" + productPrice + "', style = '" + style + "' where productID = " + id); 
    await db.load('SET FOREIGN_KEY_CHECKS = 1');
    const url = '/admin/editProduct';
    res.redirect(url);
});

// chỉnh sửa ảnh sản phẩm
router.get('/editProduct/:id/imageEdit', async function(req, res) {
    const id = req.params.id;
    const list = await db.load('select pm.* from productimages pm where productID = ' + id);
    
    fs.mkdir(path.join('public', 'img', id),
    { recursive: true }, (err) => {
        if (err) {
        return console.error(err);
        }
    });

    res.render('adminImageEdit', {
        layout : 'admin.main.handlebars',
        categories : list
    });
   
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join('public', 'img', req.params.id))
    },
    filename: async function (req, file, cb) {
        var name = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, name);
        await db.load('update productimages set ' + file.fieldname + " = '" + name + "' where productID = " + req.params.id);
    }
})
var upload = multer({
    storage: storage
})
var multiUpload = upload.fields([{name: 'main', maxCount: 10}, {name: 'view1', maxCount: 10}, {name: 'view2', maxCount: 10}, {name: 'view3', maxCount: 10}, {name: 'view4', maxCount: 10}]);
router.post('/editProduct/:id/imageEdit', multiUpload, async function(req, res) {
    const url = '/admin/editProduct/' + req.params.id;
    res.redirect(url);
});

// xóa sản phẩm!
router.get('/delproduct/:id', async function(req, res) {
    const id = req.params.id;
    await db.load('SET FOREIGN_KEY_CHECKS = 0');
    await db.load('delete from productdetails where productID = ' + id);
    await db.load('delete from customer_product where productID = ' + id);
    await db.load("update products set status = 'DELETE' where productID = " + id );
    await db.load('SET FOREIGN_KEY_CHECKS = 1');
    var url = '/admin/editProduct';
    res.redirect(url);
});

// tìm kiếm sản phẩm
router.get('/searchbyproduct', async function(req, res) {
    //var page = req.query.page;
    var q = req.query.q;
    var rows;
    if (!isNaN(parseFloat(q)) && !isNaN(q - 0)) {
        rows = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status ='SELLING' and p.productID = " + q);
    } else {
        rows = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' and p.productName LIKE '%" + q + "%'");
    }
    res.render('adminEdit', {
        layout : 'admin.main.handlebars',
        categories : rows,
        adminSearchProduct : true
    })
});
module.exports = router;