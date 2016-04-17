var validate = require("./validate");
var request_api = require('request');
var config = require('../config.json');


forgetPath = function(request, response)
{
    var content;
    if(validate.isEmail(request.body.email))
    {
        var options = {
            url: config.api_endpoint + "/forgotPassword",
            headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            json: true,
            body: 
            {
                "email": request.body.email
            }
        }

        request_api.post(options, function(error, api_response, body)
        {
            if(!error && body.ackValue == "SUCCESS")
            {
                response.render("login", {
                    message : {
                        type: "success",
                        content: "A reset email has been sent to \n " + request.body.email
                    }
                });
            }
            else
            {
                response.render("login", {
                    message : {
                        type: "danger",
                        content: "There is something up with the SC server, please try again later"
                    }
                });
            }

        });

    }
    else
    {
        response.render("login", {
            message : {
                type: "warning",
                content: "That's not a valid email"
            }
        });
    }

}

module.exports = {
    forgetPath: forgetPath
}