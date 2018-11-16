const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

var User = mongoose.model('User', UserSchema);

module.exports = {
	User: User
}