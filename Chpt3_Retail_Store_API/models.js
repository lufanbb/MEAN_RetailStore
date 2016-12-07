var mongoose = require('mongoose');
var wagner = require('wagner-core');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/test');

	var Category = mongoose.model('Category', require('./category_Schema'), 'categories');

	wagner.factory('Category', function() {
		return Category;
	});

	return{
		Category: Category
	};
};