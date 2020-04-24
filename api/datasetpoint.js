var express = require('express');
var app = express();

var data = require('./data/dataset.json')


app.get('/home', function (req, res) {
	res.send(data);
})

app.get("/search/:searchtext", (req, res) => {
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

app.get("/save", (req, res) =>{
	console.log(req.params);
	res.send("save request got");
});

//app.post("/update/", (req,res) => {
	

app.listen(2345, () => {
	console.log("server is work");
	
});

