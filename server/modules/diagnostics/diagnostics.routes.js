import express from 'express';
import {
    testLogs,
    testExceptions,
    testRejections,
} from './diagnostics.controller.js';

const diagRouter = express.Router();

diagRouter.get('/test-logs', testLogs);
// prueba de excepciones y rejections
// solo acceso en modo desarrollo
    diagRouter.get('/test-exceptions', testExceptions);
// prueba de rejections
diagRouter.get('/test-rejections', testRejections);

export default diagRouter;