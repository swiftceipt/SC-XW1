var request_api = require('request');

/*
Takes a receipt and adds lat and long to it
*/
addLatLong = function(receipt)
{
	var query_string = receipt.address + " " + receipt.city + " " + receipt.state;
	query_string = "https://maps.googleapis.com/maps/api/geocode/json?address=" + query_string + "&key=AIzaSyAplgHQOAr-awfM5ZsUm6X6a8aOgNH9W0Q";

	request_api.get(query_string, function(error, response, body)
	{
		body = JSON.parse(body)
		console.log(body.results[0].geometry.location);
	});


	return receipt;
}

module.exports = {
	addLatLong: addLatLong
}