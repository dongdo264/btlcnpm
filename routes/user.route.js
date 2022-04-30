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
    var loaidinh = req.query.loaidinh;
    if (!loaidinh) {
        loaidinh = "";
    }
    if (!name) {
        name = "";
    }
    if (!page) {
        page = 1;
    }
    if (!type) {
        type = "";
    }
    const countP = await db.load("SELECT count(*) as count FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%'");
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
    var list;
    if (!type) {
        type = "";
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' limit 12 offset " + offset);
    } else if (type == 'asc') {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' order by productPrice limit 12 offset " + offset);
    } else if (type == 'desc') {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' order by productPrice desc limit 12 offset " + offset);
    } else if (type == 'mostsale') {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "' and style LIKE '% " + loaidinh + "%' order by quantityOrdered limit 12 offset " + offset);
    }
    res.render('search', {
        categories : list,
        page_number,
        searchName: name,
        loaidinh,
        type,
        empty : list.length === 0,
        home: false
    });
});

module.exports = router;