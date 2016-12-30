var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);
require('./dependencies')(wagner);

var app = express();

wagner.invoke(require('./auth'), { app: app });

app.use('/api/v1', require('./api')(wagner));

/**
 * Using the Express middleware to serve static files
 * first argument '/public' is to set up a virtual path
 * The second argument Angular is the actual path that contain the static file
 */

app.use('/public', express.static('Angular'));

app.listen(3000);

console.log('Listening on port 3000!');