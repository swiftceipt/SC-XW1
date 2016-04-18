var assert = require('chai').assert;
var api_wrapper = require('../config/api_wrapper');

describe('SC Server', function()
{
    it("should accept valid login credentials", function(done)
    {
        api_wrapper.make_api_call("/signIn",
        {
            "email": "jack@cirno.de", 
            "password": 1234
        },
        function (error, response, body)
        {
            assert.isTrue(body != undefined);
            assert.isTrue(body.ackValue != undefined);
            assert.isTrue(body.ackValue == "SUCCESS");
            done();
        });
    });

    it("should not accept invalid login credentials", function(done)
    {
        api_wrapper.make_api_call("/signIn",
        {
            "email": "lskfjhglksjdhfglkjshdflkhjgf",
            "password": 42908750
        },
        function (error, response, body)
        {
            assert.notEqual(body.ackValue, "SUCCESS");
            done();
        });
    });
});
