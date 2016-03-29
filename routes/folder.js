var request_api = require('request');


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
                request.session.folders.push(body.folders[i].name);
            }
            console.log(request.session);
            callback(response);
        }
        else
        {
            response.redirect("/logout")
        }
    });

}

module.exports = {
    save_folder_info: save_folder_info
}