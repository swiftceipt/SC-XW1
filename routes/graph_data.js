
var request_api = require('request');
var validation = require('./validate');

exports.init = function(app)
{
	app.get("/graph_data", is_logged_in, f1);
}

parse_date_string = function(date_str){
	result = {};
	var elements = date_str.split(" ");
	date = elements[0].split("-");
	time = elements[1].split(":");
	var year = parseInt(date[0]);
	var month = parseInt(date[1]);
	var day = parseInt(date[2]);
	var hour = parseInt(time[0]);
	var min = parseInt(time[1]);
	var sec = parseFloat(time[2]);
	result.year = year;
	result.month = month;
	result.day = day;
	result.hour = hour;
	result.min = min;
	result.sec = sec;
	return result;
}
by_year = function(receipts){
	var result = {}
	for(var i = 0; i < receipts.length; i++){
		date = 
		result.receipts[0].date_created = 
		console.log(sc_data[0].total);
			console.log(sc_data[0].date_created); 
	}

}
by_month = function(receipts){
	for(var i = 0; i < receipts.length; i++){

	}
}

by_store = function(receipts){
	for(var i = 0; i < receipts.length; i++){

	}
}

f1 = function(request, response)
{
	var authToken = request.session.authToken;

	var options = {
        url: "https://tenv-service.swiftceipt.com/getNewReceipts",
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: 
        {
            // use the token that we're provided
            // used date that occurs way before swiftCeipt
            // was made to get all of them
            authToken: request.session.authToken,
            lastUpdateTimestamp: "2000-01-01 00:00:00.0"
        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        if(!error)
        {
        	sc_data = body.receipts;
        	console.log(sc_data.length);
        	console.log(sc_data[0].total);
			console.log(parse_date_string(sc_data[0].date_created));        	
        	console.log(sc_data[1].total);
        	console.log(sc_data[1].date_created);   
        	console.log(sc_data[2].total);
        	console.log(sc_data[2].date_created);   
        	console.log(sc_data[12].total);
        	console.log(sc_data[12].date_created); 
        	console.log(sc_data[11].total);
        	console.log(sc_data[11].date_created); 
        	response.render("graph_data", sc_data);

            //response.render("receipts", {receipts: body.receipts});
        }
        else
        {
            console.log(error);
            sc_data = none;
            response.render("graph_data", sc_data);

            //response.render("receipts", {receipts: "None"});
        }
    });
	}