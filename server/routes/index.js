import express from 'express';
const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    counter++;
    numbers.push(counter);
    res.render('index', { 
        title: 'Martinez Sanchez Angel', /* Puedes cambiar 'Cruz Torres Ricardo' por tu propio nombre */
        counter,
        numbers
    });
});

export default router;