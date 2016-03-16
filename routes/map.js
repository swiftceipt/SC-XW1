var request_api = require('request');

/*
Takes a receipt and adds lat and long to it
*/
addLatLong = function(receipt)
{
	var query_string = receipt.address + " " + receipt.city + " " + receipt.state + " " + receipt.zipcode
	console.log(query_string);

	return receipt;
}

module.exports = {
	addLatLong: addLatLong
}