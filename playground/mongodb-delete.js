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

	// deleteMany
	/*db.collection('Todos').deleteMany({
		text: 'Walk the dog'
	})
	.then((result) => {
		console.log(result);
	});

	// deleteOne
	db.collection('Todos').deleteOne({
		text: 'Walk the dog'
	})
	.then((result) => {
		console.log(result);
	});*/

	// findOneAndDelete
	db.collection('Todos').findOneAndDelete({
		text: 'Something to do - test delete'
	})
	.then((result) => {
		console.log(result);
	});

	// close connection when done
	client.close();
});