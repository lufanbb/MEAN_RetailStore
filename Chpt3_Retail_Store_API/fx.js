var superagent = require('superagent');
var _ = require('underscore');

module.exports = function() {
	var url = 'https://openexchangerates.org/api/latest.json?app_id=' +
				process.env.OPEN_EXCHANGE_RATES_API_KEY;

	var rates =  {
		USD: 1,
		EUR: 1.1,
		GBP: 1.5
	};

	var ping = function(callback) {
		superagent.get(url, function(error, res) {
			// If error happens, ignore it because we'll try again in an hour
			if (error) {
				callback(error);
                return;
			}

			var results;
			try{
				results = JSON.parse(res.text);
				_.each(results.rates, function(value, key) {
					rates[key] = value;
				});
			} catch (e) {
				if (callback) {
					callback(e);
				}
			}
		});
	};
	// Repeat ping function every hour
	setInterval(ping, 60 * 60 * 1000);
	//Return the current state of the exchange rates
	var ret = function() {
		return rates;
	};

	ret.ping = ping;

	return ret;
};