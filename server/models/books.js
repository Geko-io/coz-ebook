CozyDB = require( 'cozydb' );

module.exports = Books = CozyDB.getModel('books',
{
	id: String,
	title: String,
	date_added: Date,
	date_update: Date
});
