var controllers = require('./controllers');
var directives = require('./directives');
var services = require('./services');
var _ = require('underscore');

var app = /**
* mean-retail Module
*
* Build the mean-retail module
*/
angular.module('mean-retail', ['ng']);

_.each(controllers, function(controller, name) {
	app.controller(name, controller);
});

_.each(directives, function(directive, name) {
	app.directive(name, directive);
});

_.each(services, function(factory, name) {
	app.factory(name, factory);
});