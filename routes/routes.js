var request_api = require('request');

exports.init = function(app)
{
    app.get("*", function(request, response)
    {
        response.render("login_tester.ejs");
    });

    app.post("/login", check_login);
}

check_login = function(request, response)
{
   var options = {
        url: "https://tenv-service.swiftceipt.com/signIn",
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: 
        {
            "email": request.body.email, 
            "password": request.body.password
        }
    };

    request_api.post(options,function (error, api_response, body)
    {
        if(body.errors.length > 0)
        {
            response.render("dummy_result",
                {
                    message: "failure"
                });
        }
        else
        {
            request.session.email = body.scEmail;
            response.render("dummy_result",
            {
                message: "success!"
            });
        }
    });
}