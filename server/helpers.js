/*
** Class containing usefull little functions
*/
module.exports = function Helpers()
{
	this.viewFolder	= __dirname + '/../public/html/';

	this.useMustacheRender = function( app, express )
	{
		mustacheExpress = require( 'mustache-express' );

		app.engine( 'html', mustacheExpress() );
		app.set( 'view engine', 'html' );
		app.set( 'views', this.viewFolder );
	}

}