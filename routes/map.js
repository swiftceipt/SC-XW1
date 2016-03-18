var request_api = require('request');

/*
Takes a receipt and adds lat and long to it
*/
addLatLong = function(receipt)
{
	var query_string = receipt.address + " " + receipt.city + " " + receipt.state + "&key=AIzaSyAplgHQOAr-awfM5ZsUm6X6a8aOgNH9W0Q";
	console.log(query_string);
	request_api.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + query_string)

	return receipt;
}

module.exports = {
	addLatLong: addLatLong
}