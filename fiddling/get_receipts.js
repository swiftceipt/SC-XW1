var request = require('request');

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
        // these are the credientials for a dummy account
        // that Kevin gave us
        "email": "jack@cirno.de", 
        "password": 1234
    }
};

request.post(options,function (error, response, body)
{
    if(!error)
    {
        makeReceiptRequest(body.authToken);
    }
    else
    {
        console.log(error);
    }
});

makeReceiptRequest = function(authToken)
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
            authToken: authToken,
            lastUpdateTimestamp: "2000-01-01 00:00:00.0"
        }
    };

    request.post(options, function(error, response, body)
    {
        if(!error)
        {
            console.log(body);
        }
        else
        {
            console.log(error);
        }
    });
}