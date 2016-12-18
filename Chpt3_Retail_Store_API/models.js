var mongoose = require('mongoose');
var wagner = require('wagner-core');
var _= require('underscore');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/test');

	var Category = mongoose.model('Category', require('./category_Schema'), 'categories');
	var Product = mongoose.model('Product', require('./product_Schema'), 'products');
	var User = mongoose.model('User', require('./user_Schema'), 'users');

	var models = {
		Category: Category,
		Product: Product,
		User: User
	};

	//To ensure DRY-ness(Don't Repeat Yourself), register factories in a loop
	_.each(models, function(value, key) {
		wagner.factory(key, function() {
			return value;
		});
	});

	return models;
};