var request = require('request');
var config = require('./config.json');

// this function streamlines all of the api calls that we make throughout the project
// removing about 10 lines of code from each API call
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

    // console.log(options);

    method = method || "post";
    request[method](options, callback);
}

module.exports = {
    make_api_call: make_api_call
}