// ENVIRONMENT SETUP

// process.env.NODE_ENV will be set by heroku by default as 'production'
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}