var request_api = require('request');
var validation = require('./validate');
var google_maps = require('./map');
var forget = require('./forget');
        
exports.init = function(app)
{
    app.get("/login",function(request, response)
    {
        response.render("login");
    });
    app.post("/login", check_login);
    app.get("/logout", is_logged_in, logout);

    app.post("/forget", forget.forgetPath);

    app.get("/register", register_landing);
    app.post("/register", register);
    
    app.get("/", landing2);


    app.get("/receipts", is_logged_in, receipts);
    app.get("/receipts/:receiptId", is_logged_in, receipt)
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
        if(api_response.statusCode == 500)
        {
            response.render("login",
            {
                message: {
                    type: "danger",
                    content: "The SwiftCeipt server is currently down (500 error)"
                }
            });
        }
        else if(body.errors.length > 0)
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
        response.render("login",
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
    // console.log(request.body);

    // validate inputs
    var result = validation.new_user(request.body);
    if(result != true)
    {
        response.render("register", {message: {
                                        type: "danger",
                                        content: result.reason }});
    }

    var options = {
        url: "https://tenv-service.swiftceipt.com/registerUser",
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: 
        {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            username: request.body.username,
            password: request.body.password

        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        if(!error && body.ackValue == "SUCCESS")
        {
            response.render("login", {message: {
                                        type: "success",
                                        content: "You have been registered!" }});
        }
        else
        {
            console.log(body.errors);
            response.render("register", {message: {
                                        type: "danger",
                                        content: body.errors[0].errorMessage }});
        }
    });

}

landing = function(request, response)
{
    response.render("dashboard", {session: request.session});
}

landing2 = function(request, response)
{
    response.render("index", {session: request.session});
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
            response.render("receipts", {receipts: body.receipts});
        }
        else
        {
            console.log(error);
            response.render("receipts", {receipts: "None"});
        }
    });
}

receipt = function(request, response)
{
    var options = {
        url: "https://tenv-service.swiftceipt.com/getReceiptById",
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
            receiptId: request.params.receiptId
        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        var popout = (request.query.popout == "true");

        if(!error && body.ackValue == "SUCCESS")
        {
            // add the lat and long from the Google Maps
            google_maps.render_with_lat_long(body.receipt, function(receipt)
            {
                response.render("receipt", {receipt: receipt,
                                            popout: popout});
            });
        }
        else
        {
            console.log(body);
            response.render("receipt", {
                                            receipt: {}, 
                                            message: {
                                                type: "danger",
                                                content: body.message },
                                            popout: popout
                                        });
        }
    });
}