// Importando el core de winston
import winston, { format } from 'winston';
import path from 'node:path';
import fs from 'node:fs';

// Importando DailyRotateFile
import DailyRotateFile from 'winston-daily-rotate-file';

// Desestructura funciones útiles de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Creando variable de directorio raíz
const rootdir = path.resolve(process.cwd());

// Creando directorio de logs
const logDir = path.join(rootdir, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Definiendo esquema de colores
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Agregando ese esquema a winston
winston.addColors(colors);

// Creación de plantillas para los formatos

// Formato de consola
const myConsoleFormat = combine(
  // Colores del formato
  colorize({ all: true }),
  // Agregando etiqueta al log
  label({ label: '📣: ' }),
  // Registro de fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Función de impresión (Corregido: info.mensaje -> info.message)
  printf(
    (info) => `${info.level} ${info.label} ${info.timestamp} ${info.message}`
  )
);

// Formato de archivos json
const myFileFormat = combine(
  // Retirar colorización
  format.uncolorize(),
  // Agregar fecha
  timestamp(),
  // Salida json
  format.json()
);

// CONSTRUYENDO Y CONFIGURANDO TRANSPORTES
// (Corregido: Se eliminó la duplicación de la carpeta 'logs' en los paths)
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(logDir, 'error.log'),
    maxsize: 5242880, // 5mb
    maxFiles: 2,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
  readableFile: {
    level: 'info',
    filename: path.join(logDir, 'readable.log'),
    maxsize: 5242880, // 5mb
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint()
    ),
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logDir, 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxsize: 5242880, // 5mb
    maxFiles: 2,
    format: myFileFormat,
  },
};

// Creando logger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    // Corregido: winston.transport -> winston.transports
    new winston.transports.File(options.readableFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  // Corregido: exeptionHandlers -> exceptionHandlers
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'exception.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'rejection.log'),
    }),
  ],
  exitOnError: false,
});

// Exportamos logger
export default logger;