const express = require('express');

const { engine } = require('express-handlebars');

const app = express();

// lay du lieu tu form gui ve
app.use(express.urlencoded({
    extended : true
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));

const catRouter = require('./routes/product.route');
app.use('/', catRouter);

const PORT = 3000;
app.listen(PORT);
