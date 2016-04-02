var request_api = require('request');

exports.init = function(app)
{
    app.get("/add/:receiptId/:folderName", is_logged_in, add);
    app.get("/remove/:receiptId/:folderName", is_logged_in, remove);
}

add = function(request,response){
	 var options = {
        url: "https://tenv-service.swiftceipt.com/folders",
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
    request_api.post(options, function(error, api_response, body)
    {
        if(!error && body.ackValue == "SUCCESS")
        {	
        	console.log(body.ackValue);
        }
        else
        {
        	console.log(body.ackValue);
        	console.log()
        	console.log(body.errors);
        	console.log("backend error");
            // response.redirect("/receipts");
        }
    });
}

remove = function(request,response){
	 var options = {
        url: "https://tenv-service.swiftceipt.com/folders/"+request.params.folderName+"/"+request.params.receiptId,
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
    console.log(options.url);
    request_api.post(options, function(error, api_response, body)
    {
        if(!error && body.ackValue == "SUCCESS")
        {
        	console.log("success");
        }
        else
        {
        	console.log("backend error");
        	console.log(body.ackValue);
        	console.log(body.errors);
            // response.redirect("/receipts");
        }
    });
}




