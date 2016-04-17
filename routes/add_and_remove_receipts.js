var request_api = require('request');
var config = require("../config/config.json");

exports.init = function(app)
{
    app.get("/add/:receiptId/:folderName", is_logged_in, add);
    app.get("/remove/:receiptId/:folderName", is_logged_in, remove);
}

add = function(request,response){
	 var options = {
        url: config.api_endpoint + "/folders",
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
            action: "PLACE",
            folderName: request.params.folderName,
            receiptId: parseInt(request.params.receiptId)
        }
    };
    console.log(options);
    request_api.post(options, function(error, api_response, body)
    {
        if(!error && body.ackValue == "SUCCESS")
        {	
            response.status(200).send({ status: 'success' });
        }
        else
        {
            console.log(body.errors);
        	response.status(500).send({ error: 'something blew up' });
            // response.redirect("/receipts");
        }
    });
}

remove = function(request,response){
	 var options = {
        url: config.api_endpoint + "/folders/"+request.params.folderName+"/"+request.params.receiptId,
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
            action: "DELETE",
            folderName: request.params.folderName,
            receiptId: parseInt(request.params.receiptId)
        }
    };
    console.log(options);
    request_api.post(options, function(error, api_response, body)
    {
        if(!error && body.ackValue == "SUCCESS")
        {   
        	response.status(200).send({ status: 'success' });
        }
        else
        {
            console.log(body.errors);
        	response.status(500).send({ error: 'something blew up' });
            // response.redirect("/receipts");
        }
    });
}




