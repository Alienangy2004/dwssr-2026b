import logger from '../../lib/winston.js';

export function testLogs(req, res) {
   logger.error('Mensaje de error');
   logger.warn('Mensaje de warning');
   logger.info('Mensaje informativo');
   logger.http('Mensaje http');
   logger.debug('Mensaje debug');

   res.json({
    message:
      'Logs de prueba generados. Revisa la consola y los archivos en /logs',
     files: [
      'logs/app-YYYY-MM-DD.log -> DailyRotateFile (info+warn+error en JSON)',
      'logs/app-readable.log -> Formato legible (info+warn+error)',
       'logs/error.log -> Solo errores',
     ],
   });
 }

export function testExceptions(req, res) {
    res.json({
       message: 'Excepción lanzada. Revisa logs exceptions.log'
     });
    
     // Genera una excepción no capturada después de 100ms
     setTimeout(() => {
       throw new Error('Excepción de prueba no capturada');
     }, 100);
   }

export function testRejections(req, res) {
     res.json({
       message: 'Promesa rechazada. Revisa archivo logs rejections'
     });
    
     // Promesa rechazada manual sin bloque catch
     Promise.reject(new Error('Promesa rechazada de prueba sin catch'));
   }