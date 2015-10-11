/*
** Basic routes management using Express and an json config file
*/
module.exports = function Routes( app, helpers )
{
	this.helpers	= helpers;
	this.app		= app;
	this.config 	= {};
	this.controller	= {};

	/*
	** Load config/routes.json file and create routes
	*/
	this.load = function()
	{
		try
		{
			this.config = require("./config/routes.json");
		}
		catch (e)
		{
			console.log("[ERROR] with config/routes.json, check the syntax or rights on the file");
		}

		for ( var tmp in this.config )
		{
			controllerName = this.config[tmp]["controller"];
			this.addController( controllerName );
			if ( !this.controller[controllerName] )
				continue ;
			this.addActions( tmp );
		}
	}

	/*
	** Load and instatiate controller by name and add it in this.controller list
	*/
	this.addController = function( name )
	{
		if ( this.controller[name] )
			return ;

		try
		{
			obj = require( "./controllers/" + name + ".js" );
			this.controller[name] = new obj( this.app, this.helpers );
		}
		catch (e)
		{
			console.log("[ERROR] Failed to instantiate '%s' controller, check routes.json or ./controllers/%s.js", name, name);
		}
	}

	/*
	** Use routes.json config for add callback for each request type and uri
	*/
	this.addActions = function( uri )
	{
		for ( var type in this.config[uri]["request"] )
		{
			method = this.config[uri]["request"][type];
			try
			{
				this.app[type](uri, this.controller[controllerName][method]);
			}
			catch (e)
			{
				console.log("[ERROR] you try to call %s method in %s class but it does'nt exist", method, controllerName)
			}
		}
	}

}