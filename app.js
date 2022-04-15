const express = require('express');
const numeral = require('numeral');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const appMiddleware = require('./middleware/app.middleware');

const app = express();

// lay du lieu tu form gui ve
app.use(express.urlencoded({
    extended : true
}));

app.engine('handlebars', engine({
    helpers: {
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

app.use('/', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);


const PORT = 3000;
app.listen(PORT);
