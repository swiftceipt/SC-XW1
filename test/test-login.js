var assert = require('chai').assert;
var request = require('request');
var config = require('../config.json');

var validate_module = require('../routes/validate');

describe('SC Server', function()
{
    it("should accept valid login credientials", function(done)
    {
        var options = {
            url: config.api_endpoint + "/signIn",
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
            assert.isTrue(body != undefined);
            assert.isTrue(body.ackValue != undefined);
            assert.isTrue(body.ackValue == "SUCCESS");
            done();
        });
    });
});