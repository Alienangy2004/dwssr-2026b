// Importando modulos express
import express from 'express';
// Importando la accion que quiero enrutar
import renderHome from './home.controller.js';

// Creando un enrutador de express
const homerouter = express.Router();

// Enrutando Action Methods del controlador Home

// GET "/"
homerouter.get('/', renderHome);

export default homerouter;
