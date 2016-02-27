var request = require('request');

exports.init = function(app)
{
    app.get("*", function(request, response)
    {
        response.render("login_tester.ejs");
    });

    app.post("/login", check_login);
}

check_login = function(req, res)
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
            "email": req.body.email, 
            "password": req.body.password
        }
    };

    request.post(options,function (error, api_response, body)
    {
        if(body.errors.length > 0)
        {
            res.render("dummy_result",
                {
                    message: "failure"
                });
        }
        else
        {
            res.render("dummy_result",
            {
                message: "success!"
            });
        }
    });
}