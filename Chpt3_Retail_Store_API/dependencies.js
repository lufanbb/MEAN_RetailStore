var Stripe = require('stripe');
var wagner = require('wagner-core');

module.exports = function(wagner) {
    var stripe = Stripe(process.env.STRIPE_API_KEY);

    wagner.factory('Stripe', function() {
        return stripe;
    });

    return {
        Stripe: stripe
    };
};