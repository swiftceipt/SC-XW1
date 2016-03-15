
var request_api = require('request');
var validation = require('./validate');

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