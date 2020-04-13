var express = require('express');
var router = express.Router();

router.get('/hello', function(req, res, next) {
    res.send({express: 'Hello from Express'});
});
router.post('/world', function(req, res, next) {
    console.log(req.body);
    res.send(`I received your POST request. This is what you sent me: ${req.body.post}`,);
});
module.exports = router;