/**
 *	Writing dependency injection using npm wagner module.
 */
var express = require('express');
var mongoose = require('mongoose');
var wagner = require('wagner-core');
var util = require('util');

setupModels(mongoose, wagner);

var app = express();

setupApp(app, wagner);

app.listen(3000);
console.log('Listening on port 3000!');

function setupModels(mongoose, wagner) {
	mongoose.connect('mongodb://localhost:27017/test');
	var userSchema = new mongoose.Schema({
		name: String
	});

	var User = mongoose.model('User', userSchema);

	wagner.factory('User', function() {
		return User;
	});
}

function setupApp(app, wagner) {
	var routeHandler = wagner.invoke(function(User) {
		return function(req, res) {
			//console.log(util.inspect(req, false, null))
			User.findOne({ name: req.params.id}, function(error, user) {
				res.json({ user: user });
			});
		}
	});

	app.get('/user/:id', routeHandler);
}