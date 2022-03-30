const express = require('express');
const { route } = require('express/lib/application');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await db.load('select * from products');
    res.render('search', {
        categories : list,
        empty : list.length === 0,
        search : " "
    });
});

// router.post('/search', function(req, res) {
//     var searchName = req.body.q;
//     if (searchName.length == 0) {
//         searchName = " ";
//     }
//     console.log(searchName.length);
//     var url = "/search/" + searchName;
//     res.redirect(url);
// });


router.get('/search', async function(req, res) {
    const name = req.query.q;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "'");
    res.render('search', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});

// router.get('/search/:searchName', async function(req, res) {
//     const name = req.params.searchName;
//     const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "'");
//     res.render('search', {
//         categories : list,
//         empty : list.length === 0,
//         search: name
//     });
// });

// router.get('/search/:searchName/sortbyprice', async function(req, res) {
//     const name = req.params.searchName;
//     const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice');
//     res.render('search', {
//         categories : list,
//         empty : list.length === 0,
//         search : name
//     });
// });


router.get('/sortbyprice', async function(req, res) {
    const name = req.query.qr;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice');
    res.render('search', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});

router.get('/sortbypricedesc', async function(req, res) {
    const name = req.query.qr;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice desc');
    res.render('search', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});
router.get('/mostsale', async function(req, res) {
    const name = req.query.qr;
    const list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by quantityOdered');
    res.render('search', {
        categories : list,
        searchName: name,
        empty : list.length === 0
    });
});

router.post('/search', async function(req, res) {
    const name = req.query.q;
    const option = req.body.optionsearch;
    //var qr = "SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice';
    var list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + '%' + "'");
    if (option == "mostsale") {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by quantityOdered');
    } else if (option == "asc") {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice');
        
    } else if (option == "desc") {
        list = await db.load("SELECT * FROM products WHERE productName LIKE '" + '%' + name + "%' " + 'order by productPrice desc');
    }  
    res.render('search', {
        categories : list,
        empty : list.length === 0,
        searchName : name
    });
});

module.exports = router;