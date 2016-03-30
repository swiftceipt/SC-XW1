var request_api = require('request');

create_folder = function(request, response)
{
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
        	authToken: request.session.authToken,
        	action: "CREATE",
        	folderName: request.body.folderName
        }
	}
}