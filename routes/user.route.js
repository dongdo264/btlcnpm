const express = require('express');
const db = require('../utils/database');

const router = express.Router();

// user truy cập vào trang chủ, lấy ra tất cả sản phẩm cho user xem
router.get('/', async function(req, res) {
    var page = req.query.page;
    var sort_by = req.query.sort_by;
    if (!page) {
        page = 1;
    }
    if (!sort_by) {
        sort_by = "";
    }
    // đếm số lượng sản phẩm
    const countP = await db.load("select count(*) as count from products where status = 'SELLING'");
    const numberOfProduct = countP[0].count;
    const limit = 12
    var numberPage = parseInt(numberOfProduct) / limit;
    if (numberPage != parseInt(numberPage)) {
        numberPage = parseInt(numberPage) + 1;
    }
    const offset = (parseInt(page) - 1) * limit;
    var page_number = [];
    for (var i = 1; i <= numberPage; i++) {
        const item = {
            value : i,
            active: i == page,
            sort_by
        }
        page_number.push(item);
    }
    // lấy các sản phẩm theo yêu cầu (sắp xếp)
    var checked_sort = 0;
    var list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' limit " + limit + " offset " + offset);
    if (sort_by == 'price-asc') {
        checked_sort = 1;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' order by productPrice limit " + limit + " offset " + offset);
    } else if (sort_by == 'price-desc') {
        checked_sort = 2;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' order by productPrice desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-asc') {
        checked_sort = 3;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' order by productName limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-desc') {
        checked_sort = 4;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING'  order by productName desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'best-selling') {
        checked_sort = 5;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' order by quantitySold desc limit " + limit + " offset " + offset);
    }
    res.render('home', {
        categories : list,
        empty : list.length === 0,
        page_number,
        home: true,
        sort_by,
        numberPage,
        end : page != numberPage,
        start : page > 1,
        checked_sort
    });
});

// user tìm kiếm sản phầm
router.get('/search', async function(req, res) {
    var name = req.query.q;             // lấy ra query user nhập tìm kiếm
    var sort_by = req.query.sort_by;    // kiểu sắp xếp
    var page = req.query.page;          // trang hiển thị
    if (!name) {
        name = "";
    }
    if (!page) {
        page = 1;
    }
    if (!sort_by) {
        sort_by = "";
    }
    // đếm số lượng sp thỏa mãn
    const countP = await db.load("SELECT count(*) as count FROM products WHERE status = 'SELLING' and ( productName LIKE '" + '%' + name  + "%' or style LIKE '%" + name + "%')");
    const numberOfProduct = countP[0].count;
    const limit = 12
    var numberPage = parseInt(numberOfProduct) / limit;
    if (numberPage != parseInt(numberPage)) {
        numberPage = parseInt(numberPage) + 1;
    }
    const offset = (parseInt(page) - 1) * limit;
    var page_number = [];
    for (var i = 1; i <= numberPage; i++) {
        const item = {
            value : i,
            searchName : name,
            sort_by,
            active: i == page
        }
        page_number.push(item);
    }
    var checked_sort = 0;
    var list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' and (productName LIKE '%" + name + "%' or style LIKE '%" + name + "%') limit " + limit + " offset " + offset);
    if (sort_by == 'price-asc') {
        checked_sort = 1;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' and (productName LIKE '%" + name + "%' or style LIKE '%" + name + "%') order by productPrice limit " + limit + " offset " + offset);
    } else if (sort_by == 'price-desc') {
        checked_sort = 2;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' and (productName LIKE '%" + name + "%' or style LIKE '%" + name + "%') order by productPrice desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-asc') {
        checked_sort = 3;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where p.status = 'SELLING' and (productName LIKE '%" + name + "%' or style LIKE '%" + name + "%') order by productName limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-desc') {
        checked_sort = 4;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and (productName LIKE '%" + name + "%' or style LIKE '%" + name + "%') order by productName desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'best-selling') {
        checked_sort = 5;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and (productName LIKE '%" + name + "%' or style LIKE '%" + name + "%') order by quantitySold desc limit " + limit + " offset " + offset);
    }
    res.render('search', {
        categories : list,
        page_number,
        searchName: name,
        sort_by,
        empty : list.length === 0,
        numberOfProduct,
        checked_sort
    });
});

// phân loại thương hiệu
router.get('/thuong-hieu/:brand', async function(req, res) {
    var brand = req.params.brand;       // lấy tên thương hiệu
    var sort_by = req.query.sort_by;    // kiểu sắp xếp
    var loaidinh = req.query.loaidinh;  // loại đinh giày
    var page = req.query.page;          // trang hiển thị
    if (!page) {
        page = 1;
    }
    if (brand == 'all') {
        brand = ''
    }
    if (!loaidinh) {
        loaidinh = '';
    }
    const countP = await db.load("select count(*) as count from products where status = 'SELLING' and productBrand LIKE '%" + brand + "%' and style LIKE '%" + loaidinh + "%'");
    const numberOfProduct = countP[0].count;
    const limit = 12
    var numberPage = parseInt(numberOfProduct) / limit;
    if (numberPage != parseInt(numberPage)) {
        numberPage = parseInt(numberPage) + 1;
    }
    const offset = (parseInt(page) - 1) * limit;
    if (brand == '') {
        brand = 'all';
    }
    var page_number = [];
    for (var i = 1; i <= numberPage; i++) {
        const item = {
            value : i,
            active: i == page,
            brand,
            loaidinh,
            sort_by
        }
        page_number.push(item);
    }
    var tmp = ['Nike', 'Adidas', 'Puma', 'Mizuno', 'Kamito'];
    const list_brand = [];
    for (var i = 0; i < tmp.length; i++) {
        const item = {
            value : tmp[i],
            active : tmp[i] == brand,
            sort_by,
            loaidinh
        }
        list_brand.push(item);
    }

    tmp = ['cỏ nhân tạo', 'cỏ tự nhiên'];
    const list_style = [];
    for (var i = 0; i < tmp.length; i++) {
        const item = {
            value : tmp[i],
            active : tmp[i] == loaidinh,
            brand,
            sort_by
        }
        list_style.push(item);
    }
    if (brand == 'all') {
        brand = ''
    }
    var checked_sort = 0;
    var list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' limit " + limit + " offset " + offset);
    if (sort_by == 'price-asc') {
        checked_sort = 1;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productPrice limit " + limit + " offset " + offset);
    } else if (sort_by == 'price-desc') {
        checked_sort = 2;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productPrice desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-asc') {
        checked_sort = 3;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productName limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-desc') {
        checked_sort = 4;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productName desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'best-selling') {
        checked_sort = 5;
        list = await db.load("select p.*, pm.main from products p inner join productimages pm on p.productID = pm.productID where status = 'SELLING' and productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by quantitySold desc limit " + limit + " offset " + offset);
    }
    if (brand == '') {
        brand = 'all';
    }
    res.render('home', {
        categories : list,
        empty : list.length === 0,
        page_number,
        list_brand,
        list_style,
        home: false,
        brand,
        loaidinh,
        end : page != numberPage,
        numberPage,
        sort_by,
        start : page > 1,
        checked_sort
    });
});

// hướng dẫn mua hàng
router.get('/order-tutorial', async function(req, res) {
    res.render('order-tutorial');
});

// chính sách bán hàng
router.get('/sales-policy', async function(req, res) {
    res.render('sales-policy');
});

// chính sách bảo hành
router.get('/warranty-policy', async function(req, res) {
    res.render('warranty-policy');
});

module.exports = router;