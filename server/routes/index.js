import express from 'express';
// Importando el logger de Winston
import logger from '../lib/winston.js';

const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', (req, res) => {
  counter += 1;
  numbers.push(counter);
  
  res.render('index', {
    title: 'Martinez Sanchez Angel Armando',
    counter,
    numbers,
  });
});

// Ruta para prueba de logs
router.get('/test-logs', (req, res) => {
  // Probando todos los niveles de severidad
  logger.error('Mensaje de error');
  logger.warn('Mensaje de warning');
  logger.info('Mensaje informativo');
  logger.http('Mensaje http');
  logger.debug('Mensaje debug');

  res.json({
    message: 'Logs de prueba generados. Revisa la consola y los archivos en /logs',
    files: ['app.log', 'readable.log', 'error.log']
  });
});

// Rutas de prueba para exceptions y rejections
// (Solo se habilitan si no estamos en entorno de producción)
if (process.env.NODE_ENV !== 'production') {
  
  // Ruta de prueba de excepciones
  router.get('/test-exceptions', (req, res) => {
    res.json({
      message: 'Excepción lanzada. Revisa logs exceptions.log'
    });
    
    // Genera una excepción no capturada después de 100ms
    setTimeout(() => {
      throw new Error('Excepción de prueba no capturada');
    }, 100);
  });

  // Ruta de prueba de rejections
  router.get('/test-rejections', (req, res) => {
    res.json({
      message: 'Promesa rechazada. Revisa archivo logs rejections'
    });
    
    // Promesa rechazada manual sin bloque catch
    Promise.reject(new Error('Promesa rechazada de prueba sin catch'));
  });
}

export default router;