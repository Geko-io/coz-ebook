module.exports = Home;

// PRIVATE STATIC
var Models = require('../models.js');

/**
 *
 * @param app
 * @param helpers
 * @constructor
 */
function Home( app, helpers )
{
	// PRIVATE
	var _app		= app;
	var _helpers	= helpers;

	this.index = function(req, res)
	{
		var data = {
			"title" : "POKPOK",
			"message" : "caliente"
		};

		Models.getModel('books').request("byTitle", {key: 'poky'}, function (err, notes)
		{
			console.log(notes);
		});

		res.render('home', data);
	};
}
