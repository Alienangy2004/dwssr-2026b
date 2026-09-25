// Funcion para manejar errores en la aplicacion
import createError from 'http-errors';
// Importa el framework express
import express from 'express';
// Importa modulos para manejar rutas (path)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Para cookies
import cookieParser from 'cookie-parser';
// Registro para saber que pasa en el servidor (Morgan)
import logger from 'morgan';

// Se importan las rutas de la aplicacion
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

// Recreación de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea la aplicacion de express
const app = express();

// Configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configura los middlewares de la aplicacion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuracion de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registramos las rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;