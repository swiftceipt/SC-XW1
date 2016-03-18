var validate = require("./validate");
var request_api = require('request');

forgetPath = function(request, response)
{
    var content;
    if(validate.isEmail(request.body.email))
    {
        var options = {
            url: "https://tenv-service.swiftceipt.com/forgotPassword",
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
            if(body.ackValue == "SUCCESS")
            {
                response.render("login", {
                    message : {
                        type: "info",
                        content: "A reset email has been sent to \n " + request.body.email
                    }
                });
            }
            else // body.ackValue = "FAILURE"
            {
                response.render("login", {
                    message : {
                        type: "danger",
                        content: body.errors[0].errorMessage
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