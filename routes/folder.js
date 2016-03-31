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
	};
    request_api.post(options, function(error, api_response, body)
    {
        console.log(body);
    });
}

folders = function(request, response)
{
    var options = {
        url: "https://tenv-service.swiftceipt.com/getAllFolders",
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: 
        {
            // use the token that we're provided
            authToken: request.session.authToken
        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        if(!error)
        {
            response.render("folders", {receipts: body.folders});
        }
        else
        {
            console.log(error);
            response.render("folders", {folders: "None"});
        }
    })
}

module.exports = {
    create_folder: create_folder,
    folders: folders
}