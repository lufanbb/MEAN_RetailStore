describe('counterDirective', function() {
	var injector;
	var element;
	var scope;

	beforeEach(function() {
		injector = angular.injector(['myApp']);
		injector.invoke(function($rootScope, $compile) {
			scope = $rootScope.$new();
			element = $compile('<counter-directive></counter-directive>')(scope);
			scope.$apply();
		});
	});

	it('increment counter when you click', function() {
			assert.equal(element.text(), 'You\'ve clicked 0 times');
			element.find('div').click();
			assert.equal(element.text(), 'You\'ve clicked 1 times');
	});
});