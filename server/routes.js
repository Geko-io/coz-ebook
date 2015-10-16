/*
** Basic routes management using Express and an json config file
*/
module.exports = Routes;

/**
 * @param app
 * @param helpers
 * @constructor
 */
function Routes( app, helpers )
{
	// PRIVATE
	var _helpers	= helpers;
	var _app		= app;
	var _config 	= {};
	var _controller	= {};

	// PUBLIC METHODS
	/*
	 ** Load config/routes.json file and create routes
	 */
	this.load = function()
	{
		try
		{
			_config = require("./config/routes.json");
		}
		catch (e)
		{
			console.log("[ERROR] with config/routes.json, check the syntax or rights on the file");
		}

		for ( var tmp in _config )
		{
			var controllerName = _config[tmp]["controller"];
			addController( controllerName );
			if ( ! _controller[controllerName] )
				continue ;
			addActions( controllerName, tmp );
		}
	};

	// PRIVATE METHODS
	/*
	 ** Load and instatiate controller by name and add it in this.controller list
	 */
	function addController( name )
	{
		if ( _controller[name] )
			return ;

		try
		{
			var obj = require( "./controllers/" + name + ".js" );
			_controller[name] = new obj( _app, _helpers );
		}
		catch (e)
		{
			console.log("[ERROR] Failed to instantiate '%s' controller, check routes.json or ./controllers/%s.js", name, name);
		}
	}

	/*
	 ** Use routes.json config for add callback for each request type and uri
	 */
	function addActions( controllerName, uri )
	{
		for ( var type in _config[uri]["request"] )
		{
			var method = _config[uri]["request"][type];
			try
			{
				_app[type](uri, _controller[controllerName][method]);
			}
			catch (e)
			{
				console.log("[ERROR] you try to call %s method in %s class but it does'nt exist", method, controllerName)
			}
		}
	}
}
