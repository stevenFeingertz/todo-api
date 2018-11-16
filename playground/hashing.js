//const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
	id: 10
};

 var token = jwt.sign(data, '123abc');

 console.log(token);


var decoded = jwt.verify(token, '123abc');

 console.log(decoded);





// TO SECURE APPLICATION, WE USE A HASH AND THEN "SALT" THE HASH WITH AN ADDITIONAL SECRET TACKED ON TO THE END. THE SALT LIVES ON THE SERVER AND WILL CONSTANTLY CHANGE, SO THE HASH CAN NEVER BE REPLICATED.

/*var message = 'I am user number 2';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);





var data = {
	id: 4
};

var token = {
	data: data,
	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// injection
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data).toString());

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
	console.log('Data was not changed');
} else {
	console.log('Data was changed. Do not use.');
}*/