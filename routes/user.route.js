const express = require('express');
const { route } = require('express/lib/application');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    var page = req.query.page;
    var sort_by = req.query.sort_by;
    if (!page) {
        page = 1;
    }
    const countP = await db.load('select count(*) as count from products');
    const numberOfProduct = countP[0].count;
    const limit = 12
    var numberPage = parseInt(numberOfProduct) / limit;
    if (numberPage != parseInt(numberPage)) {
        numberPage += 1;
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
    var list = await db.load('select * from products limit ' + limit + " offset " + offset);
    if (sort_by == 'price-asc') {
        list = await db.load("select * from products order by productPrice limit " + limit + " offset " + offset);
    } else if (sort_by == 'price-desc') {
        list = await db.load("select * from products order by productPrice desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-asc') {
        list = await db.load("select * from products order by productName limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-desc') {
        list = await db.load("select * from products  order by productName desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'best-selling') {
        list = await db.load("select * from products order by quantitySold desc limit " + limit + " offset " + offset);
    }
    res.render('home', {
        categories : list,
        empty : list.length === 0,
        page_number,
        home: true
    });
});

router.get('/search', async function(req, res) {
    var name = req.query.q;
    var sort_by = req.query.sort_by;
    var page = req.query.page;
    if (!name) {
        name = "";
    }
    if (!page) {
        page = 1;
    }
    if (!sort_by) {
        sort_by = "";
    }
    const countP = await db.load("SELECT count(*) as count FROM products WHERE productName LIKE '" + '%' + name + '%' + "'");
    const numberOfProduct = countP[0].count;
    const limit = 12
    var numberPage = parseInt(numberOfProduct) / limit;
    if (numberPage != parseInt(numberPage)) {
        numberPage += 1;
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
    var list = await db.load("select * from products where productName LIKE '%" + name + "%' or style LIKE '%" + name + "%' limit " + limit + " offset " + offset);
    if (sort_by == 'price-asc') {
        list = await db.load("select * from products where productName LIKE '%" + name + "%' or style LIKE '%" + name + "%' order by productPrice limit " + limit + " offset " + offset);
    } else if (sort_by == 'price-desc') {
        list = await db.load("select * from products where productName LIKE '%" + name + "%' or style LIKE '%" + name + "%' order by productPrice desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-asc') {
        list = await db.load("select * from products where productName LIKE '%" + name + "%' or style LIKE '%" + name + "%' order by productName limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-desc') {
        list = await db.load("select * from products where productName LIKE '%" + name + "%' or style LIKE '%" + name + "%' order by productName desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'best-selling') {
        list = await db.load("select * from products where productName LIKE '%" + name + "%' or style LIKE '%" + name + "%' order by quantitySold desc limit " + limit + " offset " + offset);
    }
    res.render('search', {
        categories : list,
        page_number,
        searchName: name,
        sort_by,
        empty : list.length === 0,
        numberOfProduct
    });
});

router.get('/thuong-hieu/:brand', async function(req, res) {
    var brand = req.params.brand;
    var sort_by = req.query.sort_by;
    var loaidinh = req.query.loaidinh;
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
    if (brand == 'all') {
        brand = ''
    }
    if (!loaidinh) {
        loaidinh = '';
    }
    const countP = await db.load("select count(*) as count from products where productBrand LIKE '%" + brand + "%' and style LIKE '%" + loaidinh + "%'");
    const numberOfProduct = countP[0].count;
    const limit = 12
    var numberPage = parseInt(numberOfProduct) / limit;
    if (numberPage != parseInt(numberPage)) {
        numberPage += 1;
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
    var list = await db.load("select * from products where productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' limit " + limit + " offset " + offset);
    if (sort_by == 'price-asc') {
        list = await db.load("select * from products where productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productPrice limit " + limit + " offset " + offset);
    } else if (sort_by == 'price-desc') {
        list = await db.load("select * from products where productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productPrice desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-asc') {
        list = await db.load("select * from products where productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productName limit " + limit + " offset " + offset);
    } else if (sort_by == 'title-desc') {
        list = await db.load("select * from products where productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by productName desc limit " + limit + " offset " + offset);
    } else if (sort_by == 'best-selling') {
        list = await db.load("select * from products where productBrand LIKE '%" + brand + "%' AND style LIKE '%" + loaidinh + "%' order by quantitySold desc limit " + limit + " offset " + offset);
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
        loaidinh
    });
});

router.get('/order-tutorial', async function(req, res) {
    res.render('order-tutorial');
});

router.get('/sales-policy', async function(req, res) {
    res.render('sales-policy');
});

router.get('/warranty-policy', async function(req, res) {
    res.render('warranty-policy');
});

module.exports = router;