const express = require('express');
const db = require('../utils/database');

const router = express.Router();

router.get('/view/:id', async function(req, res) {
    const id = req.params.id;
    const product = await db.load("SELECT * FROM products WHERE productID = " + id);
    res.render('view', {
       categories : product
    });
});

router.post('/view/:id', async function(req, res) {
    var size = req.body.selectsize;
    const id = req.params.id;
    const obj = {
        customerID : req.signedCookies.sessionId,
        productId : id
    }
    const tb = 'customerscart';
    db.add(tb, obj);
    //const url = '/product/view/' + id;
    res.redirect('/');
});

router.get('/view/:id/addtocart', async function(req, res) {
    console.log(req.body.selectsize);
    const id = req.params.id;
    const obj = {
        customerID : req.signedCookies.sessionId,
        productId : id
    }
    const tb = 'customerscart';
    db.add(tb, obj);
    //const url = '/product/view/' + id;
    res.redirect('/');
});


module.exports = router;