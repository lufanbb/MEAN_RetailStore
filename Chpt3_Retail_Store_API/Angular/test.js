describe('Test MEAN Nav Bar', function() {
	var injector;
	var element;
	var scope;
	var compiler;
	var httpBackend;

	beforeEach(function() {
		injector = angular.injector(['mean-retail', 'ngMockE2E']);
		intercepts = {};

		injector.invoke(function($rootScope, $compile, $httpBackend) {
			scope = $rootScope.$new();
			compiler = $compile;
			httpBackend = $httpBackend;
		});
	});

	it('shows logged in users profile picture', function(done) {
		// Adding httpBackend passthrough for template request 
		// to make sure static file request didn't get blocked.
		// We also need to change karma.local.conf.js to make sure 
		// karma server will provide static files 
		httpBackend.whenGET('/public/template.html').passThrough();
		httpBackend.whenGET('/public/templates/user_menu.html').passThrough();
		
		httpBackend.expectGET('/api/v1/me').respond({
			user: { profile: {picture: 'myPic' } }
		});

		element = compiler('<user-menu></user-menu>')(scope);
		scope.$apply();

		scope.$on('UserMenuController', function() {
			assert.equal(element.find('.title').text().trim(), 'MEAN Retail');

			httpBackend.flush();
			assert.notEqual(element.find('.user-info .user').css('display'), 'none');
			// selector to select layer of classes .user-info .user and tag img to get the source
			assert.equal(element.find('.user-info .user img').attr('src'), 'myPic');
			done();
		});	
	});
});