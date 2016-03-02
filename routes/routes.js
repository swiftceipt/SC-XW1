var request_api = require('request');

exports.init = function(app)
{
    app.get("/login",function(request, response){
        
        response.render("login");
        
    });
    app.post("/login", check_login);
    app.get("/logout", is_logged_in, logout);

    app.get("/register", register_landing);
    app.post("/register", register);
    
    app.get("/", function(request, response)
    {
        response.render("index");
    });

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
            response.render("login",
                {
                    message: {
                        type: "danger",
                        content: body.errors[0].errorMessage
                    }
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

is_logged_in = function(request, response, next)
{
    if(request.session && request.session.email)
    {
        next();
    }
    else
    {
        response.render("login_tester",
        {
            message: {
                type: "danger",
                content: "You have to login to see that!"
            }
        });
    }
}

logout = function(request, response)
{
    request.session.reset();
    response.redirect('/');
}

register_landing = function(request, response)
{
    response.render("register", {});
}

register = function(request, response)
{
    // create a new user based on the given parameters
    console.log(request.body);
    response.render("register", {});
}

landing = function(request, response)
{
    response.render("dashboard", {session: request.session});
}

receipts = function(request, response)
{
    var options = {
        url: "https://tenv-service.swiftceipt.com/getNewReceipts",
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: 
        {
            // use the token that we're provided
            // used date that occurs way before swiftCeipt
            // was made to get all of them
            authToken: request.session.authToken,
            lastUpdateTimestamp: "2000-01-01 00:00:00.0"
        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        if(!error)
        {
            response.render("receipts", {receipts: body});
        }
        else
        {
            console.log(error);
            response.render("receipts", {receipts: "None"});
        }
    });
}