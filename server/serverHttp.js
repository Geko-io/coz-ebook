/*
** Main server class for create http server listening host:port
** and create routes using Routes class
*/

module.exports = ServerHttp;

// PRIVATE STATIC
var Helpers		= require( "./helpers.js" );
var Express		= require('express');
var Http		= require('http');

/**
 @param {string} [host]
 @param {int} [port]
 @constructor
 */
function ServerHttp( host, port )
{
	// PRIVATE
	var _helpers	= new Helpers();
	var _host		= host;
	var _port		= port;
	var _app		= Express();
	var _server		= null;
	var _routes		= null;
	var _models		= null;

	// PUBLIC METHODS
	this.run = function()
	{
		_helpers.useMustacheRender( _app );
		loadRoutes();
		loadModels();
		_server = Http.createServer( _app ).listen( _port, _host, startMessage );
	};

	// PRIVATE METHODS
	function startMessage()
	{
		console.log("Server listening to %s:%d", _host, _port );
	}

	function loadRoutes()
	{
		var Routes = require('./routes.js');
		_routes = new Routes( _app, _helpers );
		_routes.load();
	}

	function loadModels()
	{
		var Models = require('./models.js');
		_models = new Models();
	}
}
