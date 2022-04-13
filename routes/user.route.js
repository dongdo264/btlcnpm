const express = require('express');
const { route } = require('express/lib/application');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await db.load('select * from products');
    res.render('home', {
        categories : list,
        empty : list.length === 0,
        search : " "
    });
});

router.get('/search', async function(req, res) {
    const name = req.query.q;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "'");
    res.render('home', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});


router.get('/sortbyprice', async function(req, res) {
    const name = req.query.qr;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice');
    res.render('home', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});

router.get('/sortbypricedesc', async function(req, res) {
    const name = req.query.qr;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice desc');
    res.render('home', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});
router.get('/mostsale', async function(req, res) {
    const name = req.query.qr;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by quantityOdered desc');
    res.render('home', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});


module.exports = router;