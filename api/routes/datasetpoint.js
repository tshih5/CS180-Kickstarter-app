var express = require('express');
var router = express.Router();

var data = require('../data/dataset.json')


router.get('/home', function (req, res) {
	res.send(data);
})

router.get("/search/:searchtext", (req, res) => {
	console.log(req.params)
	
    if (req.params["searchtext"] == "undefined") {
	res.send(data)}
	else {
		searchtext = req.params["searchtext"].toLowerCase();
		matches = [];
		for(i = 0; i < data.length; i++) {
			if (data[i].name.toLowerCase().includes(searchtext)) {
				matches.push(data[i])
			}
		
		}	
		console.log("returning these" + matches)
		res.send(JSON.stringify(matches));
	}
});

router.get("/save", (req, res) =>{
	console.log(req.body);
	res.end("success");
});

//app.post("/update/", (req,res) => {
module.exports = router;	
