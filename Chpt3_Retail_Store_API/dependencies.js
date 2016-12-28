var Stripe = require('stripe');
var fx = require('./fx');
var wagner = require('wagner-core');
var Config = require('./config.json');

module.exports = function(wagner) {
    var stripe = Stripe(Config.stripeKey);

    wagner.factory('Stripe', function() {
        return stripe;
    });

    wagner.factory('fx', fx);

    return {
        Stripe: stripe,
        fx: fx
    };
};