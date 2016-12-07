var express = require('express');
var wagner = require('wagner-core');
var assert = require('assert');
var superagent = require('superagent');

var URL_ROOT = 'http://localhost:3000';

describe('Category API', function() {
	var server;
	var Category;

	before(function() {
		var app = express();

		//Bootstrap Server
		models = require('./models')(wagner);
		app.use(require('./api')(wagner));

		server = app.listen(3000);

		//Make Category model available in tests
		Category = models.Category;
	});

	after(function() {
		//Shut the server down when we're done
		server.close();
	});

	beforeEach(function(done) {
		//Make sure categories are empty before each test
		Category.remove({}, function(error) {
			assert.ifError(error);
			done();
		});
	});

	it('Can load a category by id', function(done) {
		//Create a single category
		Category.create({ _id: 'Electronics' }, function(error, doc) {
			assert.ifError(error);
			var url = URL_ROOT + '/category/id/Electronics';
			//Make an HTTP request to localhost:3000/category/id/Electronics
			superagent.get(url, function(error, res) {
				assert.ifError(error);
				var result;
				//And make sure we got { _id: 'Electronics' } back
				assert.doesNotThrow(function() {
					result = JSON.parse(res.text);
				});
				assert.ok(result.category);
				assert.equal(result.category._id, 'Electronics');
				done();
			});
		});
	});
});