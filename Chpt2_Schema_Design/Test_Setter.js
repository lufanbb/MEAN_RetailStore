var mongoose = require('mongoose');
var productSchema = require('./product_Schema.js');

var Product = mongoose.model('Product', productSchema, 'products');

var p = new Product({
	name: 'test',
	price: {
		amount: 5,
		currency: 'USD'
	},
	category: {
		name: 'test'
	}
});

console.log(p);
console.log(p.internal.approximatePriceUSD);