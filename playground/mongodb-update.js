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


	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5beb3c22af34826d8494670c')
	},{
		$set : {
			text: 'Get oil change for truck',
			completed: true,
			dateCompleted: new Date()
		}
	})
	.then((result) => {
		console.log(result);
	});



	/*db.collection('Todos').findOneAndUpdate({
		completed: true
	})
	.then((result) => {
		console.log(result);
	});*/



	// close connection when done
	client.close();
});