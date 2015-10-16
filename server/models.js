module.exports = Models;

/**
 *
 * @constructor
 */
function Models()
{
	// PRIVATE
	var _models = [];

	module.exports.getModel = function( model )
	{
		var m;
		if ( _models[model] )
			m = _models[model];
		else
		{
			try
			{
				m = require( __dirname + '/models/' + model + '.js' );
				_models[model] = m;
			}
			catch ( e )
			{
				console.log( e );
			}
		}
		return m;
	};
}