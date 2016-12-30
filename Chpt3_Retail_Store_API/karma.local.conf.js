module.exports = function(config) {
	config.set({
		files: [
			'http://code.jquery.com/jquery-1.11.3.js',
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
			//For ngMorckE2E
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-mocks.js',
			'./Angular/angular_app.js',
			'./Angular/angular_test.js'
		],
		frameworks: ['chai', 'mocha'],
		browsers: ['Chrome'],
		proxies: {
			'/public': 'http://localhost:3000'
		}
	});
};