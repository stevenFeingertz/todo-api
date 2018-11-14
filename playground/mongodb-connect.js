/*
	MongoDB Notes
	The mongodb db is not an application, it's a directory of executables. I placed it in my user (stevenFeingertz) folder. I then created a folder in the same directory called 'mongo-data'.

	To start the db, I navigate to the bin directory of mongo db and type './mongod --dbpath ~/mongo-data'. I have to tell the db where the data is being stored.

	I can also user robomongo application to get a gui interface for mongo db
*/


const MongoClient = require('mongodb').MongoClient;

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

	// add new todo
	db.collection('Todos').insertOne({
		text: 'Something to do',
		completed: false
	}, (err, result) => {
		if (err) {
			return console.log('Unable to Unable to insert todo.', err);
		}

		console.log(JSON.stringify(result.ops,undefined,4));
	});

	// add new user
	db.collection('Users').insertOne({
		name: 'Steven Feingertz',
		age: 47,
		location: '1988 Drumlin Drive, Apex, NC 27502'
	}, (err, result) => {
		if (err) {
			return console.log('Unable to Unable to insert user.', err);
		}

		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,4));
	});

	// close connection when done
	client.close();
});