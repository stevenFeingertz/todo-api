const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*Todo.remove({}).then((result) => {
	console.log(result);
});*/


Todo.findByIdAndRemove('5bedb798cb499910922f0d02').then((todo) => {
	console.log(todo);
});