var cozydb = require( 'cozydb' );

module.exports =
{
	books:
	{
		all: cozydb.defaultRequests.all,
		byTitle: function( doc )
		{
			emit(doc.title, doc);
		}
	}
};