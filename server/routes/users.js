import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('<h1 style="color:red">Listado de usuarios no deseados</h1>');
});

export default router;