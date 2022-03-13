const express = require('express');
const db = require('../utils/database');

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await db.load('select * from categories');
    res.render('home', {
        categories : list,
        empty : list.length === 0
    });
});

router.post('/search', async function(req, res) {
    const searchName = req.body.searchCat;
    const list = await db.load("SELECT * FROM categories WHERE CatName LIKE '" + '%' + searchName + '%' + "'");
    res.render('search', {
        categories : list,
        empty : list.length === 0
    });
})

module.exports = router;