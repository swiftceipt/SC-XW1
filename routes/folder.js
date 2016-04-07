var request_api = require('request');

init = function(app)
{
    app.get("/folders/:folder_name", is_logged_in, oneFolder);
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
            // response.redirect("/receipts");
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
    init: init
}
