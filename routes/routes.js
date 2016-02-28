var request_api = require('request');

exports.init = function(app)
{
    app.get("/", function(request, response)
    {
        response.render("login_tester.ejs");
    });

    app.post("/login", check_login);
    app.get("/dashboard", is_logged_in,landing);
    app.get("/receipts", is_logged_in, receipts);
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
            // save user info in the session
            request.session.email = body.scEmail;
            request.session.authToken = body.authToken;
            response.redirect("dashboard");
        }
    });
}

landing = function(request, response)
{
    response.render("dashboard", {session: request.session});
}

receipts = function(request, response)
{
    response.render("receipts", {email: request.session.email});
}

is_logged_in = function(request, response, next)
{
    if(request.session && request.session.email)
    {
        next();
    }
    else
    {
        response.render("login_tester");
    }
}