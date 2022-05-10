const express = require('express');
const { route } = require('express/lib/application');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    var page = req.query.page;
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
            active: i == page
        }
        page_number.push(item);
    }
    const list = await db.load('select * from products limit ' + limit + " offset " + offset);
    res.render('home', {
        categories : list,
        empty : list.length === 0,
        page_number,
        home: true
    });
});

router.get('/search', async function(req, res) {
    var name = req.query.q;
    var type = req.query.type;
    var page = req.query.page;
    loaidinh='';
    if (!name) {
        name = "";
    }
    if (!page) {
        page = 1;
    }
    if (!type) {
        type = "";
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
            loaidinh,
            type,
            active: i == page
        }
        page_number.push(item);
    }
    const list_sort = [];
    var tmp = ['Sắp xếp theo giá tăng dần', 'Sắp xếp theo giá giảm dần', 'Sắp xếp theo bán chạy nhất'];
    for (var i = 0; i < tmp.length; i++) {
        const item = {
            value : tmp[i],
            value2 : '',
            searchName: name,
            loaidinh,
            active : false
        }
        list_sort.push(item);
    }
    list_sort[0].value2 = 'asc';
    list_sort[1].value2 = 'desc';
    list_sort[2].value2 = 'mostsale';
    var list;
    if (!type) {
        type = "";
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' limit 12 offset " + offset);
    } else if (type == 'asc') {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' order by productPrice limit 12 offset " + offset);
        list_sort[0].active = true;
    } else if (type == 'desc') {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' order by productPrice desc limit 12 offset " + offset);
        list_sort[1].active = true;
    } else if (type == 'mostsale') {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' order by quantitySold limit 12 offset " + offset);
        list_sort[2].active = true;
    }
    tmp = ['Nike', 'Adidas', 'Puma', 'Mizuno', 'Kamito'];
    const list_brand = [];
    for (var i = 0; i < tmp.length; i++) {
        const item = {
            value : tmp[i],
            active : tmp[i] == name,
            type,
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
            searchName : name,
            type
        }
        list_style.push(item);
    }
    res.render('search', {
        categories : list,
        page_number,
        searchName: name,
        loaidinh,
        type,
        empty : list.length === 0,
        home: false,
        list_brand,
        list_style,
        list_sort,
        numberOfProduct
    });
});

router.get('/thuong-hieu/:brand', async function(req, res) {
    var brand = req.params.brand;
    const type = req.query.type;
    const loaidinh = req.query.loaidinh;
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
    if (brand == 'all') {
        brand = ''
    }
    const countP = await db.load("select count(*) as count from products where productBrand LIKE '%" + brand + "%'");
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
            active: i == page
        }
        page_number.push(item);
    }

    if(brand == '') {
        brand = 'all';
    }

    var tmp = ['Nike', 'Adidas', 'Puma', 'Mizuno', 'Kamito'];
    const list_brand = [];
    for (var i = 0; i < tmp.length; i++) {
        const item = {
            value : tmp[i],
            active : tmp[i] == brand,
            type,
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
            type
        }
        list_style.push(item);
    }

    const list = await db.load('select * from products limit ' + limit + " offset " + offset);
    res.render('home', {
        categories : list,
        empty : list.length === 0,
        page_number,
        list_brand,
        list_style,
        home: false
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