var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var _ = require('underscore');

var components = /**
* mean-retail Module
*
* Build the mean-retail component module
*/
angular.module('mean-retail.components', ['ng', 'ngRoute']);

_.each(controllers, function(controller, name) {
	components.controller(name, controller);
});

_.each(directives, function(directive, name) {
	components.directive(name, directive);
});

_.each(services, function(factory, name) {
	components.factory(name, factory);
});

var app = /**
* mean-retail Module
*
* Build the mean-retail route module
*/
angular.module('mean-retail', ['mean-retail.components', 'ng', 'ngRoute']);

app.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/product/:id', {
			template: '<product-details></product-details>'
		});
}]);