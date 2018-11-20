const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minLength: 1,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

// OVERRIDE PRE-BUILT INSTANCE METHOD - This method is called automatically when the return from this schema converts to JSON. That's because it's a pre-built part of this model and doesn't need to be explicitly called.
// I am intercepting it here to stop the whole document from being returned
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

// CUSTOM INSTANCE METHOD: a custom instance method needs to be explicitly called from the route to run
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

	user.tokens.push({
		access, token
	});

	return user.save().then(() => {
		return token;
	});
};

// CUSTOM MODEL METHOD - this will run as part of the model
UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		return Promise.reject({
			message: 'Authorization Required. Invalid Token'
		});
	 	// when this promise rejects, it will end up in the catch method of the route for an error
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});

};

var User = mongoose.model('User', UserSchema);

module.exports = {
	User: User
}
