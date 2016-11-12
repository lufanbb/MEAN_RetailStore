var express = require('express');

module.exports = function() {
	var app = express();

	app.get('/', function(req,res) {
		res.send('Hello, World!');
		console.log('Pringing response : ' + res.object + res.Object);
	});

	app.get('/user/:user', function(req, res) {
		res.send('Page for user ' + req.params.user 
			+ ' with option ' + req.query.option
			+ ' with filter ' + req.query.filter);
	});

	return app;
};