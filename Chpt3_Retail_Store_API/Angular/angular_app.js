var app = angular.module('myApp', ['ng']);

app.directive('userMenu', function() {
	return {
		controller: 'MyHttpController',
		templateUrl: '/public/template.html'
	}
});

app.controller('MyHttpController', function($scope, $http) {
	$http.get('/api/v1/me').success(function(data) {
		$scope.user = data.user;
	});
	// Set Timeout for testing purpose to make sure the MyHttpController Event below
	// is fired in the next event loop after template is done rendering
	setTimeout(function() {
		$scope.$emit('MyHttpController');
	}, 0);
});