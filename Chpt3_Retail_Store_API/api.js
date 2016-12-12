var express = require('express');
var status = require('http-status');
var wagner = require('wagner-core');

module.exports = function(wanger) {
	var api = express.Router();

	/**
	 * [description]
	 * [get category by category id]
	 */
	api.get('/category/id/:id', wagner.invoke(function(Category) {
		return function(req, res) {
			Category.findOne({ _id: req.params.id}, function(error, category) {
				if (error) {
					return res.
						status(status.INTERNAL_SERVER_ERROR)
						.json({ error: error.toString() });
				}

				if (!category) {
					return res.
						status(status.NOT_FOUND).
						json({ error: 'Not Found' });
				}

				res.json({ category: category });
			});
		};	
	}));

	/**
	 * [description]
	 * [get Categories by its parent category]
	 */
	api.get('/category/parent/:id', wagner.invoke(function(Category) {
		return function(req, res) {
			Category.
				find({ parent: req.params.id }).
				sort({ _id: 1}).
				exec(function(error, categories) {
					if (error) {
						return res.
							status(status.INTERNAL_SERVER_ERROR).
							json({ error: error.toString() });
					}

					res.json({ categories: categories});
				})
		}
	}));

	/**
	 * Get product by its id
	 */
	api.get('/product/id/:id', wagner.invoke(function(Product) {
		return function(req, res) {
			Product.findOne({ _id: req.params.id }, handleOne.bind(null, 'product', res));
		};
	}));

	/**
	 * Get product by its parent id
	 */
	api.get('/product/category/:id', wagner.invoke(function(Product) {
		return function(req, res) {
			var sort = { name: 1 };
			if (req.query.price === "1") {
				sort = { 'internal.approximatePriceUSD': 1 };
			} else if (req.query.price === "-1") {
				sort = { 'internal.approximatePriceUSD': -1 };
			}

			Product.
				find({ 'category.ancestors': req.params.id }).
				sort(sort).
				exec(handleMany.bind(null, 'products', res));
		};
	}));


	/**
	 * Generic reusable function utilize bind to deal with query one element from the collection
	 */
	function handleOne(property, res, error, result) {
		if (error) {
			return res.
				status(status.INTERNAL_SERVER_ERROR).
				json({ error: error.toString() });
		}

		if (!result) {
			return res.
				status(status.NOT_FOUND).
				json({ error: 'Not found'});
		}

		var json = {};
		json[property] = result;
		res.json(json);
	}

    /**
	 * Generic reusable function utilize bind to deal with query many element from the collection
     */
    function handleMany(property, res, error, results) {
    	if (error) {
			return res.
				status(status.INTERNAL_SERVER_ERROR).
				json({ error: error.toString() });
		}

		if (!results) {
			return res.
				status(status.NOT_FOUND).
				json({ error: 'Not found'});
		}

		var json = {};
		json[property] = results;
		res.json(json);
    }

	return api;
};