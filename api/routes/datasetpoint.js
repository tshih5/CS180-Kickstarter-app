var express = require('express');
var router = express.Router();
const fs = require('fs');
var data = require('../data/dataset.json')


router.get('/home', function (req, res) {
	res.send(data);
});

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

router.post("/save", (req, res, next) =>{
	var changedData = req.body;
	console.log("changed data is " + JSON.stringify(changedData));
	let id = [];
	for(var i in changedData){
		for(var j in data){
			if(changedData[i].ID === data[j].ID){
				id.push(JSON.stringify(data[j].ID));
				console.log("ID found: " + JSON.stringify(data[j].ID));
				data[j]= changedData[i];
			}
		}
	}
	fs.writeFile("../api/data/dataset.json", JSON.stringify(data, null, 4), err =>{
		if(err){
			console.log(err);
		}
	});
	res.send('Save request recieved; Changed Project ' + id.toString());
});

router.post("/add", (req, res, next) =>{
	var obj = 
		{
		"category": "",
	    "": "",
	    "name": "insert project name",
	    "main_category": "",
	    "country": "",
	    "pledged": "",
	    "usd_pledged": "",
	    "backers": "",
	    "currency": "",
	    "state": "",
	    "deadline": "",
	    "ID": "",
	    "launched": "",
	    "goal": ""
		};
	fs.readFile("../api/data/dataset.json", 'utf8', function (err, data) {
		var temp = JSON.parse(data)
			temp.push(obj)
				fs.writeFile("../api/data/dataset.json", JSON.stringify(temp, null, 4), function (err, temp)  {
			if(err){
					console.log(err);
				}
			});
			res.send(temp);

		});
});

router.post("/delete_element", () => {
	data.splice(data[0], 1);
	console.log("deleting first element of array")
	fs.writeFile("../api/data/dataset.json", JSON.stringify(data, null, 4), err =>{
		if(err){
			console.log(err);
		}
	});
});

router.post("/getDonation", (req, res, next) => {
	var donationData = req.body;
	console.log(donationData);
	
	var money = 0.00;
	var count = 0;

	for(var i in data) {
		if(data[i].main_category == donationData.value) {
			money = money + parseInt(data[i].usd_pledged);
			count++;
		}
	}
	var donation = (money / count);
	donation = donation.toPrecision(3);
	console.log(donation);
	res.send(donation.toString());
});

//app.post("/update/", (req,res) => {
module.exports = router;	

