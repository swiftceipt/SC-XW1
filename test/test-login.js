var assert = require('chai').assert;
var request = require('request');

var validate_module = require('../routes/validate');

describe('SC Server Status', function()
{
    it("Should allow you to login", function(done)
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