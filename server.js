// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var request = require('request');
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 9090; // set our port


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	console.log('hello');
	res.json({ message: 'API endpoint sample' });	
});

// on routes that end in /test
// ----------------------------------------------------
router.route('/test')

	//  (accessed at POST http://localhost:8080/test)
	.post(function(req, res) {
		res.json({ message: 'POST done!' });
	})

	//  (accessed at GET http://localhost:8080/api/test)
	.get(function(req, res) {
		res.json({ message: 'GET done!' });
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port :' + port);
