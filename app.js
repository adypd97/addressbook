var express = require('express');
var bodyParser = require('body-parser');
var db  = require('./database');
var app  = express();

app.use(bodyParser.urlencoded({ extended: true })); // so app can use url-encoded strings

// now we add routes to the applications.
// routes link unique URLs to actions in the application when they are initiated at the user end
// each route serves a specific path and supports a different operation
//

//GET for /person/$ID path which displays the database record for the person with specified ID.
app.get("/person/:id", function(req,res) {
	db.Person.findByPk(req.params.id)
	.then(person => {
		res.status(200).send(JSON.stringify(person));
	})
	.catch(err => {
		res.status(500).send(JSON.stringify(err));
	});
});

// create a person in the database. this will handle the put request and access
// person's data from the req.body 
app.put("/person", function(req,res) {
	db.Person.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		id: req.body.id
	})
	.then( person => {
		res.status(200).send(JSON.stringify(person));
	})
	.catch( err => {
		res.status(500).send(JSON.stringify(err));
	});
});

// now to delete a person from the address book
app.delete("/person/:id", function(req,res) {
	db.Person.destroy({
		where: {
			id: req.params.id
		}
	})
	.then( () => {
		res.status(200).send();
	})
	.catch( err => {
		res.status(500).send(JSON.stringify(err));
	});
});

// and now to get all the people in the database
app.get("/all", function(req, res) {
	db.Person.findAll()
	.then(persons => {
		res.status(200).send(JSON.stringify(persons));
	})
	.catch( err => {
		res.status(500).send(JSON.stringify(err));
	});
});

// if request doesn't match any routes then send a 404 
app.use(function(req,res) {
	res.status(404).send('404 - Not Found');
});


// now the listen method that starts up the server for incoming connections
var server = app.listen(process.env.PORT || 3000, function() {
	console.log("app is running on port ", server.address().port);
});



