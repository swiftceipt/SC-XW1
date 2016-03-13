exports.init = function(app)
{
	app.get("/graph_data", is_logged_in, f1);
}

/*
	to call this function from the front end
	you can use JQuery to send an AJAX request to 
	/graph_data
*/

f1 = function(request, response)
{
	var authToken = request.session.authToken;

	// call the SC api to get the data from the SC database
	var sc_data = {1: "Dog", 2: "Cat"};

	// send the data back
	response.send(sc_data);
}