var express = require('express');
var wagner = require('wagner-core');
var assert = require('assert');
var status = require('http-status');
var superagent = require('superagent');

var URL_ROOT = 'http://localhost:3000';

describe('Node API', function() {
	var server;
	var Category;
	var Product;
	var User;

	before(function() {
		var app = express();

		//Bootstrap Server
		models = require('./models')(wagner);

        //Make Category model available in tests
        Category = models.Category;
        Product = models.Product;
        User = models.User;
        console.log('Before Time:', Date.now());

        //Have to attach the router with app.use before it attach to the application.
        app.use(function(req, res, next) {
            console.log('Before User Middleware Time:', Date.now());
            User.findOne({}, function(error, user) {
                assert.ifError(error);
                req.user = user;
                next();
            });
        });

        app.use(require('./api')(wagner));

        server = app.listen(3000);

	});

	after(function() {
		//Shut the server down when we're done
        console.log('After Time:', Date.now());
		server.close();
	});

	beforeEach(function(done) {
		//Make sure categories are empty before each test
		Category.remove({}, function(error) {
			assert.ifError(error);
		});

		Product.remove({}, function(error) {
			assert.ifError(error);
		});

		User.remove({}, function(error){
			assert.ifError(error);
		});

        var categories = [
            { _id: 'Electronics' },
            { _id: 'Phones', parent: 'Electronics' },
            { _id: 'Laptops', parent: 'Electronics' },
            { _id: 'Bacon' }
        ];

        var products = [
            {
                name: 'LG G4',
                category: { _id: 'Phones', ancestors: ['Electronics', 'Phones']},
                price: {
                    amount: 300,
                    currency: 'USD'
                }
            },
            {
                _id: '000000000000000000000001',
            	name: 'Asus Zenbook Prime',
                category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops']},
                price: {
                    amount: 2000,
                    currency: 'USD'
                }
            },
            {
                name: 'Flying Pigs Farm Pasture Raised Prok Bacon',
                category: { _id: 'Bacon', ancestors: ['Bacon'] },
                price: {
                    amount: 20,
                    currency: 'USD'
                }
            }
        ];

        var users = [{
        	profile: {
        		username: 'vkarpov15',
				picture: 'http://google.com'
			},
			data: {
        		oauth: 'invalid',
				cart: []
			}
		}];

        /**
		 * Can not emben Product into Category, User into Product
		 * If do so the Product and User will be created later in the event loop
		 * which will cause Product and User data isn't ready before test needs it.
         */
        Category.create(categories, function(error) {
        	assert.ifError(error);
		});
        Product.create(products, function(error) {
            assert.ifError(error);
        });
        User.create(users, function(error) {
            assert.ifError(error);
        });

        console.log('Before Each Time:', Date.now());

		done();
	});

	describe('Category APT', function() {
		it('Can load a category by id', function(done) {
			//Create a single category
			Category.create({ _id: 'Electronics' }, function(error, doc) {
				assert.ifError(error);
				var url = URL_ROOT + '/category/id/Electronics';
				//Make an HTTP request to localhost:3000/category/id/Electronics
				superagent.get(url, function(error, res) {
					assert.ifError(error);
					var result;
					//And make sure we got { _id: 'Electronics' } back
					assert.doesNotThrow(function() {
						result = JSON.parse(res.text);
					});
					assert.ok(result.category);
					assert.equal(result.category._id, 'Electronics');
					done();
				});
			});
		});

		it('Can load all categories that have a certain parent', function(done) {
			var categories = [
				{ _id: 'Electronics' },
				{ _id: 'Phones', parent: 'Electronics' },
				{ _id: 'Laptops', parent: 'Electronics' },
				{ _id: 'Bacon' }
			];

			//Create 4 categories
			Category.create(categories, function(error, categories) {
				var url = URL_ROOT + '/category/parent/Electronics';
				//Make an HTTP request to localhost:3000/category/parent/Electronics
				superagent.get(url, function(error, res) {
					assert.ifError(error);
					var result;
					assert.doesNotThrow(function() {
						result = JSON.parse(res.text);
					});
					assert.equal(result.categories.length, 2);
					//should be in ascending order by _id
					assert.equal(result.categories[0]._id, 'Laptops');
					assert.equal(result.categories[1]._id, 'Phones');
					done();
				});
			});
		});
	});

	describe('Product API', function() {
		it('Can load a product by id', function(done) {
			//Create a single product
			var PRODUCT_ID = '000000000000000000000001';
			var product = {
				name: 'LG G4',
				_id: PRODUCT_ID,
				price: {
					amount: 300,
					currency: 'USD'
				}
			};
            console.log('[Can load a product by id] API Time:', Date.now());
			Product.create(product, function(error, doc) {
                console.log('{Callback}[Can load a product by id] API Time:', Date.now());
				assert.ifError(error);
				var url = URL_ROOT + '/product/id/' + PRODUCT_ID;
				//Make an HTTP request to localhost:3000/product/id/000000000000000000000001
				superagent.get(url, function(error, res) {
					assert.ifError(error);
					var result;
					//And make sure we got 'LG G4' back
					assert.doesNotThrow(function() {
						result = JSON.parse(res.text);
					});
					assert.ok(result.product);
					assert.equal(result.product._id, PRODUCT_ID);
					assert.equal(result.product.name, 'LG G4');
					done();
				});
			});
		});

		it('Can load all products in a category with sub-categories', function(done) {

			//Create 4 categories
			Category.create(categories, function(error, categories) {
				assert.ifError(error);
                console.log('[Can load all products in a category with sub-categories] API Time:', Date.now());
				Product.create(products, function(error, products) {
                    console.log('{Callback}[Can load all products in a category with sub-categories] API Time:', Date.now());
					assert.ifError(error);
					var url = URL_ROOT + '/product/category/Electronics';
					//Make an HTTP request to localhost:3000/product/ancestor/Electronics
					superagent.get(url, function(error, res) {
                        console.log('{Superagent}{Callback}[Can load all products in a category with sub-categories] API Time:', Date.now());
						assert.ifError(error);
						var result;
						assert.doesNotThrow(function() {
							result = JSON.parse(res.text);
						});
						assert.equal(result.products.length, 2);
						//should be in ascending order by name
						assert.equal(result.products[0].name, 'Asus Zenbook Prime');
						assert.equal(result.products[1].name, 'LG G4');

						//Sort by price, ascending
						var url = URL_ROOT + '/product/category/Electronics?price=1';
						superagent.get(url, function(error, res) {
							assert.ifError(error);
							var result;
							assert.doesNotThrow(function() {
								result = JSON.parse(res.text);
							});
							//Should be sorted ascending order by price
							assert.equal(result.products[0].name, 'LG G4');
							assert.equal(result.products[1].name, 'Asus Zenbook Prime');
						});
						done();
					});
				});

			});
		});
	});

	describe('USER CART API', function() {
        var PRODUCT_ID = '000000000000000000000001';


        it('Can save users Cart', function(done) {

            console.log('USER CART API Time:', Date.now());
            var url = URL_ROOT + '/me/cart';

            superagent.put(url).
            send({
                data: {
                    cart: [{ product: PRODUCT_ID , quantity: 1}]
                }
            }).end(function(error, res) {
                assert.ifError(error);
                assert.equal(res.status, status.OK);
                User.findOne({}, function(error, user) {
                    assert.ifError(error);
                    assert.equal(user.data.cart.length, 1);
                    assert.equal(user.data.cart[0].product, PRODUCT_ID);
                    assert.equal(user.data.cart[0].quantity,1 );
                    /**
					 * done() has to be added on the last event loop of the whole test
					 * Otherwise it will take the wrong done signal and start the next test
					 * which will interfere with the current test result
                     */
                    done();
                });
            });
        });

		it ('Can load users cart', function(done) {
			var url = URL_ROOT + '/me';

			User.findOne({}, function(error, user) {
				assert.ifError(error);
				user.data.cart = [{ product: PRODUCT_ID, quantity: 1 }];
				user.save(function(error) {
					assert.ifError(error);

					superagent.get(url, function(error, res) {
						assert.ifError(error);

						assert.equal(res.status, 200);
						var result;
						assert.doesNotThrow(function() {
							result = JSON.parse(res.text).user;
						});
						assert.equal(result.data.cart.length, 1);
						assert.equal(result.data.cart[0].product.name, 'Asus Zenbook Prime');
						assert.equal(result.data.cart[0].quantity, 1);
						done();
					});
				});
			});
		});
	});


});
