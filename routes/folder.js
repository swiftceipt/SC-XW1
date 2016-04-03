var request_api = require('request');

init = function(app)
{
    app.get("/folders/:folder_name", is_logged_in, oneFolder);
}

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
        request.session.folders.push(request.body.folderName);
        // var redirect_url = "folders/" + request.body.folderName;
        response.redirect("/receipts");
    });
}

rename_folder = function(request, response)
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
            action: "RENAME",
            folderName: request.body.folderName
        }
    };
    request_api.post(options, function(error, api_response, body)
    {
        console.log(body);
        response.redirect("/receipts");
    });
}

delete_folder = function(request, response)
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
            action: "DELETE",
            folderName: request.body.folderName
        }
    };
    request_api.post(options, function(error, api_response, body)
    {
        console.log(body);
        response.redirect("/receipts");
    });
}

oneFolder = function(request, response)
{
    var options = {
        url: "https://tenv-service.swiftceipt.com/getFolderByName",
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: 
        {
            "authToken": request.session.authToken,
            "folderName": request.params.folder_name
        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        console.log(body);
        if(!error && body.ackValue == "SUCCESS")
        {
            response.render("receipts", {receipts: body.folder.receipts, session: request.session});
        }
        else
        {
            console.log(error);
            response.redirect("/receipts");
        }
    });
}


save_folder_info = function(response, request, callback)
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
            "authToken": request.session.authToken
        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        request.session.folders = [];
        if(!error && body.ackValue == "SUCCESS")
        {
            for(var i = 0; i < body.folders.length; i ++)
            {
                console.log(body.folders[i].name);
                request.session.folders.push(body.folders[i].name);
            }
            callback(response);
        }
        else
        {
            response.redirect("/logout")
        }
    });

}

module.exports = {
    save_folder_info: save_folder_info,
    init: init,
    create_folder: create_folder,
    delete_folder: delete_folder,
    rename_folder: rename_folder
}
