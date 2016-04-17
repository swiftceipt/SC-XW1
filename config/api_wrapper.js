var request = require('request');
var config = require('./config.json');


make_api_call = function(endpoint, body, callback, method)
{
    var options = {
        url: config.api_endpoint + endpoint,
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: body
    };

    method = method || "post";
    request[method](options, callback);
}

module.exports = {
    make_api_call: make_api_call
}