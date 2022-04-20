const express = require('express');
const { route } = require('express/lib/application');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await db.load('select * from products');
    res.render('home', {
        categories : list,
        empty : list.length === 0,
        searchName : "",
        searchbystyle : false
    });
});

router.get('/search', async function(req, res) {
    const name = req.query.q;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "'");
    res.render('search', {
        categories : list,
        searchName: name,
        empty : list.length === 0,
        searchbystyle : false
    });
});

router.get('/searchbystyle', async function(req, res) {
    const name = req.query.loaidinh;
    const list = await db.load("SELECT * FROM products WHERE style LIKE '" + '%' + name + '%' + "'");
    res.render('search', {
        categories : list,
        searchName: name,
        empty : list.length === 0,
        searchbystyle : true
    });
});


router.get('/sortbyprice', async function(req, res) {
    const name = req.query.qr;
    const loaidinh = req.query.loaidinh;
    var list;
    var searchbystyle = false;
    if (!loaidinh) {
    list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice');
    }
    else if (!name) {
        searchbystyle = true;
        list = await db.load("SELECT * FROM products WHERE style LIKE '" + '%' + loaidinh + "%' " + 'order by productPrice');
    }
    var searchName = name;
    if (!name) {
        searchName = loaidinh;
    }
    res.render('search', {
        categories : list,
        searchName,
        empty : list.length === 0,
        searchbystyle
    });
});

router.get('/sortbypricedesc', async function(req, res) {
    const name = req.query.qr;
    const loaidinh = req.query.loaidinh;
    var list;
    var searchbystyle = false;
    if (!loaidinh) {
    list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice desc');
    }
    else if (!name) {
        var searchbystyle = true;
        list = await db.load("SELECT * FROM products WHERE style LIKE '" + '%' + loaidinh + "%' " + 'order by productPrice desc');
    }
    var searchName = name;
    if (!name) {
        searchName = loaidinh;
    }
    res.render('search', {
        categories : list,
        searchName,
        empty : list.length === 0,
        searchbystyle
    });
});
router.get('/mostsale', async function(req, res) {
    const name = req.query.qr;
    const loaidinh = req.query.loaidinh;
    var list;
    var searchbystyle = false;
    if (!loaidinh) {
    list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by quantityOrdered desc');
    }
    else if (!name) {
        searchbystyle = true;
        list = await db.load("SELECT * FROM products WHERE style LIKE '" + '%' + loaidinh + "%' " + 'order by quantityOrdered desc');
    }
    var searchName = name;
    if (!name) {
        searchName = loaidinh;
    }
    res.render('search', {
        categories : list,
        searchName,
        empty : list.length === 0,
        searchbystyle
    });
});


module.exports = router;