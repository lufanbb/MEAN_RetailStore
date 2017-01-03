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