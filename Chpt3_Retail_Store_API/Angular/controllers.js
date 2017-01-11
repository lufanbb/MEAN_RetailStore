exports.UserMenuController = function($scope, $user) {
	$scope.user = $user;
	setTimeout(function() {
		$scope.$emit('UserMenuController');
	}, 0);
};
//Need to jnject the property Annotation because
//Careful: If you plan to minify your code, your service names 
//will get renamed and break your app if we user implicit Annotation
exports.UserMenuController.$inject = ['$scope', '$user'];

exports.ProductDetailsController = function($scope, $routeParams, $http) {

	var encoded = encodeURIComponent($routeParams.id);

	$http.
		get('/api/v1/product/id/' + encoded).
		success(function(data) {
			$scope.product = data.product;
		});

	setTimeout(function() {
		$scope.$emit('ProductDetailsController');
	}, 0);

};

exports.ProductDetailsController.$inject = ['$scope', '$routeParams', '$http'];