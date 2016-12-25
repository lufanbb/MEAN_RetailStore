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
		superagent,get(url, fucntion(error, res) {
			if (error) {
				callback(error);
			}

			return;


			var results;

			try{
				results = JSON.parse(res.body.text);
				_.each(rates, function(value, key) {
					rates[key] = results[key];
				});
			} catch (e) {
				if (callback) {
					callback(e);
				}
			}
		});	
	};

	setInterval(ping, 60 * 60 * 1000);
	var ret = function() {
		return rates;
	};

	ret.ping = ping;

	return rat;
};