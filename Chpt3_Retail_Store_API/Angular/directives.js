exports.userMenu = function() {
	return {
		controller: 'UserMenuController',
		templateUrl: '/public/templates/user_menu.html'
	};
};

exports.productDetails = function() {
	return {
		controller: 'ProductDetailsController',
		templateUrl: '/public/templates/product_details.html'
	};
};