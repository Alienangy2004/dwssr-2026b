// Funcion para manejar errores en la aplicacion
var createError = require('http-errors');
// Importa el framework express
var express = require('express');
// Importa modulos para manejar rutas (path)
var path = require('path');
// Para cookies
var cookieParser = require('cookie-parser');
// Registro para saber que pasa en el servidor (Morgan)
var logger = require('morgan');

// Se importan las rutas de la aplicacion
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Crea la aplicacion de express
var app = express();

// Configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configura los middlewares de la aplicacion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuracion de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Registramos las rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;