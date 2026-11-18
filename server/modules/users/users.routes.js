// Importando modulos express
import express from 'express';

import getUsers from './users.controller.js';

// Creando un enrutador de express
const userrouter = express.Router();

// Enrutando GET "/users"
userrouter.get('/', getUsers);

export default userrouter;
