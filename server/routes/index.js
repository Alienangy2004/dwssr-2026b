import express from 'express';
const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
// Se eliminó el parámetro 'next'
router.get('/', function(req, res) {
    counter++;
    numbers.push(counter);
    res.render('index', { 
        title: 'Martinez Sanchez Angel', 
        counter,
        numbers
    });
});

export default router;