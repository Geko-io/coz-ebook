/*
** Main server class for create http server listening host:port
** and create routes using Routes class
*/
module.exports = function ServerHttp( host, port )
{
	Helpers = require( "./helpers.js" );

	this.helpers	= new Helpers();
	this.host 		= host;
	this.port 		= port;
	this.express	= require('express');
	this.http		= require('http');
	this.app		= this.express();
	this.server		= null;
	this.routes		= null;

	this.run = function()
	{
		this.app.use("/public", this.express.static(__dirname + '/../public'));
		this.helpers.useMustacheRender( this.app, this.express );
		this.loadRoute();
		this.server = this.http.createServer( this.app ).listen( this.port, this.host, this.startMessage );
	};

	this.startMessage = function()
	{
		console.log("Server listening to %s:%d", host, port );
	};

	this.loadRoute = function()
	{
		Routes = require('./routes.js');
		this.routes = new Routes( this.app, this.helpers );
		this.routes.load();
	}

}
