var request_api = require('request');

/*
Takes a receipt and adds lat and long to it
*/
render_with_lat_long = function(receipt, callback)
{
	var query_string = receipt.address + " " + receipt.city + " " + receipt.state;
	query_string = "https://maps.googleapis.com/maps/api/geocode/json?address=" + query_string + "&key=AIzaSyAplgHQOAr-awfM5ZsUm6X6a8aOgNH9W0Q";

	request_api.get(query_string, function(error, response, body)
	{
		body = JSON.parse(body);

		receipt.coordinates = body.results[0].geometry.location;

		callback(receipt);
	});


}

module.exports = {
	render_with_lat_long: render_with_lat_long
}