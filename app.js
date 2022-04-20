const express = require('express');
const numeral = require('numeral');
const { engine } = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
const cookieParser = require('cookie-parser');
const appMiddleware = require('./middleware/app.middleware');

const app = express();

// lay du lieu tu form gui ve
app.use(express.urlencoded({
    extended : true
}));

app.engine('handlebars', engine({
    helpers: {
        section : express_handlebars_sections(),
        format_number : function(value) {
            return numeral(value).format('0,0');
        }
    }
}
));
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(cookieParser('MY SECRET'));

app.use(appMiddleware);


const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const cartRouter = require('./routes/cart.route');
const adminRouter = require('./routes/admin.route');

app.use('/', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
