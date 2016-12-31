module.exports = function(config) {
	config.set({
		files: [
			'http://code.jquery.com/jquery-1.11.3.js',
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
			//For ngMorckE2E
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-mocks.js',
			'./Angular/angular_app.js',
			'./Angular/angular_test.js',
			/**
			 * This tells Karma to start a static web server and be ready to 
			 * serve any HTML files that are in the current directory.
			 */
			{ pattern: './Angular/*.html', included: false, served: true }
		],
		frameworks: ['chai', 'mocha'],
		browsers: ['Chrome'],
		port: 9876,
		proxies: {
			'/public': 'http://localhost:9876/base/Angular'
		}
	});
};