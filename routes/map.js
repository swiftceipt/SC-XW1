var request_api = require('request');

/*
Takes a receipt and adds lat and long to it
*/
addLatLong = function(receipt)
{
	var query_string = receipt.address + " " + receipt.city + " " + receipt.state;

	// var options = {
	// 	url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + query_string + "&key=AIzaSyAplgHQOAr-awfM5ZsUm6X6a8aOgNH9W0Q",
	// 	headers:
	// 	{
 //            "Accept": "application/json",
 //            "Content-Type": "application/json"
 //        },
 //        json: true
	// }
	// console.log(query_string);

	// request_api.get(options, function (error, api_response, body)
	// {
	// 	console.log(body);
	// });
	
	request_api("https://maps.googleapis.com/maps/api/geocode/json?address=" + query_string + "&key=AIzaSyAplgHQOAr-awfM5ZsUm6X6a8aOgNH9W0Q", function(error, response, body) {
		console.log(body);
		// var jsonBody = JSON.parse(body);
	});


	return receipt;
}

module.exports = {
	addLatLong: addLatLong
}