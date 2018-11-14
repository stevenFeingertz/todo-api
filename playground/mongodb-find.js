// const MongoClient = require('mongodb').MongoClient;

// object deconstruction - below code is the same as above commented out code
// this is a way to pull out an object and turn it into a variable
const {MongoClient, ObjectID} = require('mongodb');

// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';

MongoClient.connect(url,(err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.');

	const db = client.db('TodoApp');

	db.collection('Todos').find({
		_id: new ObjectID('5beb3c22af34826d8494670c'),
		subscriberid: 83676
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 4));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});


	// close connection when done
	client.close();
});