const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*var id = '5becbcc8a3ac4a8de63602de12';

if ( !ObjectID.isValid(id) ) {
	console.log('ID not valid');
}*/


/*Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos', todos);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo', todo);
});*/

/*Todo.findById(id).then((todo) => {
	if (!todo) {
		return console.log('ID not found');
	}
	console.log('Todo by ID', todo);
}).catch((e) => {
	console.log(e);
});*/

var id = '5bec84fe16c010874c5b8b8a';

if ( !ObjectID.isValid(id) ) {
	return console.log('ID not valid');
}

User.findById(id).then((user) => {
	if (!user) {
		return console.log('User not found');
	}
	console.log(JSON.stringify(user, undefined, 4));
}).catch((e) => {
	console.log(e);
});