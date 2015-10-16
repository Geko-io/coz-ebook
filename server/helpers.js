/*
** Class containing usefull little functions
*/
module.exports = Helpers;

// PRIVATE STATIC
var MustacheExpress = require( 'mustache-express' );

/**
 * @constructor
 */
function Helpers()
{
	var _viewFolder;

	this.useMustacheRender = function( app )
	{
		_viewFolder	= __dirname + '/../public/html/';

		app.engine( 'html', MustacheExpress() );
		app.set( 'view engine', 'html' );
		app.set( 'views', _viewFolder );
	};
}
