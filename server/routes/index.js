import express from 'express';

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

export default router;