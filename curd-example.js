var mongodb = require('mongodb');

var uri = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function(error, db) {
	if(error){
		console.log(error);
		process.exit(1);	
	}
	var doc = [
	{
		title : 'Robin Hood',
		year: 1975,
		director: 'Steve Hawking',
		rating: {
			critics: 80,
			audience: 97
		},
		screenplay: ['Peter','John']
	},
	{
		title: 'Mad Man',
		year: 1987,
		director: 'Lance Smarter',
		rating: {
			critics: 83,
			audience: 96
		},
		screenplay: ['Frank','Jack']	
	}
	];
	

	db.collection('movies').insert(doc, function(error, results){
		if(error){
			console.log(error);
			process.exit(1);
		}
		var query = { 'rating.audience': {'$gte': 97}};	
		db.collection('movies').find(query).toArray(function(error, docs){
			if(error){
				console.log(error);
				process.exit(1);
			}
			
			console.log('Found docs:');
			docs.forEach(function(doc){
				console.log(JSON.stringify(doc));
			});
			process.exit(0);
		});
	});
});
