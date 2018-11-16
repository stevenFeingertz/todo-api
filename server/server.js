require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


// SETUP EXPRESS
var app = express();

// HEROKU PORT VAR
const port = process.env.PORT;

// EXPRESS MIDDLEWARE
app.use(bodyParser.json());

// ROUTES

// --- ADD ---
app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}).catch((e) => {
		res.status(400).send();
	});
});

// --- GET ALL ---
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}).catch((e) => {
		res.status(400).send();
	});
});

// --- GET ONE ---
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
	}).catch((e) => {
		res.status(400).send();
	});
});

// --- DELETE ---
app.delete('/todos/:id', (req, res) => {

	//capture url param
	var id = req.params.id;

	// id valid?
	if ( !ObjectID.isValid(id) ) {
		return res.status(404).send(); // sending back empty body (404 status is not found)
	}

	// id is valid, try to remove todo
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send(); // sending back empty body (404 status is not found)
		}

		res.send({todo});

	}).catch((e) => {
		res.status(400).send();
	});
});

// --- UPDATE ---
app.patch('/todos/:id',(req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	// id valid?
	if ( !ObjectID.isValid(id) ) {
		return res.status(404).send(); // sending back empty body (404 status is not found)
	}

	// check completed
	if ( _.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send(); // sending back empty body (404 status is not found)
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});


// START SERVER
app.listen(port, () => {
	console.log(`Started on port ${port}`);
});






