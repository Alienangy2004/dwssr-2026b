import express from 'express';
const router = express.Router();

/* GET users listing. */
// Se eliminó el parámetro 'next'
router.get('/', (req, res) => {
  res.send('<h1 style="color:red">Listado de usuarios no deseados</h1>');
});

export default router;