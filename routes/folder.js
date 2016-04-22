var request_api = require('request');
var config = require("../config/config.json");


init = function(app)
{
    app.get("/folders/:folder_name", is_logged_in, oneFolder);
}

create_folder = function(request, response)
{
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
        	authToken: request.session.authToken,
        	action: "CREATE",
        	folderName: request.body.folderName
        }
	};
    request_api.post(options, function(error, api_response, body)
    {
        if(!error && body.ackValue == "SUCCESS")
        {
            console.log(body);
            request.session.folders.push(request.body.folderName);
            response.status(200).send({ status: 'success' });
        }
        else if (api_response.statusCode == 409)
        {
            console.log(body);
            response.status(500).send({ error: 'This folder already exists' });
        }
        else if(api_response.statusCode == 401)
        {
            response.redirect("/logout");
        }
        else
        {
            console.log(body);
            response.status(500).send({ error: 'something blew up'});
        }
    });
}

rename_folder = function(request, response)
{
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
            authToken: request.session.authToken,
            action: "RENAME",
            folderName: request.params.folderId,
            newFolderName: request.body.newFolderName
        }
    };
    console.log(request.params.folderId);
    request_api.post(options, function(error, api_response, body)
    {
        if (!error && body.ackValue == "SUCCESS")
        {
            var i = request.session.folders.indexOf(request.params.folderId);
            request.session.folders[i] = request.body.newFolderName
            response.status(200).send({ status: 'success' });

        }
        else if (api_response.statusCode == 409)
        {
            console.log(body);
            response.status(500).send({ status: 'already exists' });
        }
        else if(api_response.statusCode == 401)
        {
            response.redirect("/logout");
        }
        else
        {
            console.log(body);
            response.status(500).send({ status: 'something blew up' });
        }
    });
}

delete_folder = function(request, response)
{
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
            authToken: request.session.authToken,
            action: "DELETE",
            folderName: request.params.folderId
        }
    };
    request_api.post(options, function(error, api_response, body)
    {
        if(!error && body.ackValue =="SUCCESS")
        {
            console.log(body);
            var i = request.session.folders.indexOf(request.params.folderId);
            request.session.folders.splice(i, 1);
            response.status(200).send({ status: 'success' });
        }
        else if(api_response.statusCode == 401)
        {
            response.redirect("/logout");
        }
        else
        {
            response.status.send({ status: 'something blew up' });
        }
    });
}

oneFolder = function(request, response)
{
    var options = {
        url: config.api_endpoint + "/getFolderByName",
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
        // console.log(body);
        if(!error && body.ackValue == "SUCCESS")
        {
            if(body.folder != null)
            {
                response.render("receipts", {receipts: body.folder.receipts, session: request.session});
            }
            else
            {
                response.render("receipts", {receipts: null, session: request.session});
            }
        }
        else
        {
            response.redirect("/receipts");
        }
    });
}


save_folder_info = function(response, request, callback)
{
    var options = {
        url: config.api_endpoint + "/getAllFolders",
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
            if(body.folders != null) // add folders if you have them
            {
                for(var i = 0; i < body.folders.length; i ++)
                {
                    request.session.folders.push(body.folders[i].name);
                }
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
