const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


// SETUP EXPRESS
var app = express();
// HEROKU PORT VAR
const port = process.env.PORT || 3000;

// EXPRESS MIDDLEWARE
app.use(bodyParser.json());

// create
app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

// get todo list
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

// get single todo
app.get('/todos/:id', (req, res) => {

	//capture url param
	var id = req.params.id;

	// id valid?
	if ( !ObjectID.isValid(id) ) {
		return res.status(404).send(); // sending back empty body (404 status is not found)
	}

	// id is valid, try to find todo
	Todo.findById(id).then((todo) => {
		if (!todo) {
		 return	res.status(404).send(); // sending back empty body (404 status is not found)
		}

		res.send({todo});
	}, (e) => {
		res.status(400).send(e);
	});
});


// START SERVER
app.listen(port, () => {
	console.log(`Started on port ${port}`);
});