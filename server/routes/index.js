import express from 'express'
const router = express.Router();

let counter = 0;
const numbers= []
/* GET home page. */
// eslint-disable-next-line
router.get('/', function(req, res, next) {
  counter++;
  numbers.push(counter);
  res.render('index', { title: 'Martinez Sanchez Angel Armando', 
    counter,
    numbers
  });
  

});

//
export default router;