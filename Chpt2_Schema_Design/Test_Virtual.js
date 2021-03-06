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

console.log(p.displayPrice);

p.price.amount = 20;
console.log(p.displayPrice);

console.log(JSON.stringify(p));

var obj = p.toObject();
console.log(obj.displayPrice);