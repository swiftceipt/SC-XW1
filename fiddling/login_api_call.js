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
        console.log(body);
    }
    else
    {
        console.log(error);
    }
});