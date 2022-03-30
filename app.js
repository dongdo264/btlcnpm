const express = require('express');

const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middleware/sessionMiddleware');

const app = express();

// lay du lieu tu form gui ve
app.use(express.urlencoded({
    extended : true
}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(cookieParser('MY SECRET'));
app.use(sessionMiddleware);

const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');

app.use('/product', productRouter);

app.use('/', userRouter);

const PORT = 3000;
app.listen(PORT);
