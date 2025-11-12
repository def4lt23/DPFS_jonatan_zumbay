const createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const userLogged = require('./middlewares/userLogged');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const apiProductsRouter = require ('./routes/api/products') //sprint 8
const apiUsersRouter = require ('./routes/api/users') //sprint 8

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('dotenv').config(); // para usar variables de entorno
//session
app.use(session({
secret: 'Top_Secret',
resave: false,
saveUninitialized: true,
}));

app.use(cookieParser());
app.use(userLogged); // debe ir despues de la session y cookie parser
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//mandar mensaje vacio al cargar por primera vez
app.use((req, res, next) => {
  res.locals.mensaje = req.session.mensaje || ''; // si existe, lo toma
  delete req.session.mensaje; // lo borramos para que no aparezca otra vez
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/products', apiProductsRouter); //sprint 8
app.use('/api/users', apiUsersRouter); //sprint 8

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
