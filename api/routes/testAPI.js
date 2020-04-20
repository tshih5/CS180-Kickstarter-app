var express = require('express');
var router = express.Router();
//Path to data 
const data = require('./../../../data/dataset.json');

router.get('/kickstarters', function(req, res, next) {
    //res.send({express: 'Hello from Express'});
    //send json file to express server
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});
router.post('/world', function(req, res, next) {
    console.log(req.body);
    res.send(`I received your POST request. This is what you sent me: ${req.body.post}`,);
});
module.exports = router;