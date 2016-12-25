var mongoose = require('mongoose');
var Category = require('./category_Schema.js');
var fx = require('./fx.js');

module.exports = function(db, fx) {
    var productSchema = {
        name: {
            type: String,
            required: true
        },
        pictures: [{
            type: String,
            match: /^http:\/\//i
        }],
        price: {
            amount: {
                type: Number,
                required: true,
                set : function(v) {
                    console.log('Test amount set : ' + v);
                    this.internal.approximatePriceUSD =
                        v / (fx()[this.price.currency] || 1);
                    return v;
                }
            },
            currency: {
                type: String,
                enum: ['USD', 'EUR', 'GBP'],
                required: true,
                set: function(v) {
                    console.log('Test currency set' + v);
                    this.internal.approximatePriceUSD =
                        this.price.amount / (fx()[v] || 1)
                    return v;
                }
            }
        },
        category: Category.categorySchema,
        internal: {
            approximatePriceUSD: Number
        }
    };

    module.exports = new mongoose.Schema(productSchema);
    module.exports.productSchema = productSchema;

    var schema = new mongoose.Schema(productSchema);
	//MongoDB won't allow you to use text search without an text index, so we need to create one.
    schema.index({ name: 'text' });

    var currencySymbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£'
    };

    schema.virtual('displayPrice').get(function(){
        return currencySymbols[this.price.currency] + '' + this.price.amount;
    });

    schema.set('toObject', {virtuals: true});
    schema.set('toJSON', {virtuals: true});

    return db.model('Product', schema, 'products');
}

