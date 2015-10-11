module.exports = function Home( app, helpers )
{
	this.app		= app;
	this.helpers	= helpers;

	this.index = function(req, res)
	{
		data = {
				"title" : "POKPOK",
				"message" : "caliente"
			};

		res.render('home', data);
	}
}
