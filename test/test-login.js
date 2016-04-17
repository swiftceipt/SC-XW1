var assert = require('chai').assert;
var request = require('request');
var config = require('../config/config.json');
var api_wrapper = require('../config/api_wrapper');

describe('SC Server', function()
{
    it("should accept valid login credientials", function(done)
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
});