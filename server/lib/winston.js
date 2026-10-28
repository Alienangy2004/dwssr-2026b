// importando el core de winston
import winston, { format } from 'winston';
// impportando
import path from 'node:path';

import fs from 'node:fs';
// importando winston
import DailyRotateFile from 'winston-daily-rotate-file';

// desectuctura funciones utiles de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// creando variable de directorio raiz
const rootdir = path.resolve(process.cwd());

// creando directorio de logd
const logDir = path.join(rootdir, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// definindo esquema de coloree
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// agregando ese esquema a winsron
winston.addColors(colors);

// creacion de plantillas para los formsatos

// formato de consola
const myConsoleFormat = combine(
  // coloes del formato
  colorize({ all: true }),
  // agregando etiqueta a log
  label({ label: '📣: ' }),
  // registro de feca
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // funcion de imprecion
  printf(
    (info) => `${info.level} ${info.label} ${info.timestamp} ${info.mensaje}`,
  ),
);

// archivos json
const myFileFormat = combine(
  // retirar colorizacion
  format.uncolorize(),
  // sgergar fecha i50
  timestamp(),
  // salida
  format.json(),
);

// CONTRULLENDO Y CONFI TRANSPORTES
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(logDir, 'logs', 'error.log'),
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
    filename: path.join(logDir, 'logs', 'readable.log'),
    maxsize: 5242880, // 5mb
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint(),
    ),
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logDir, 'logs', 'app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxsize: 5242880, // 5mb
    maxFiles: 2,
    format: myFileFormat,
  },
};

// creando looger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transport.File(options.readableFile),
    new winston.transport.File(options.errorFile),
    new winston.transport.Console(options.console),
  ],
  exeptionHandlers: [
    new winston.transport.File({
      filename: path.join(logDir, 'exception.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transport.File({
      filename: path.join(logDir, 'rejection.log'),
    }),
  ],
  exitOnError: false,
});

// exportmaos looger
export default logger;