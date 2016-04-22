var assert = require('chai').assert;
var api_wrapper = require('../config/api_wrapper');
var request = require("request");
var config = require("../config/config.json");
var Chance = require('chance');
var chance = new Chance();

describe("/routes/routes.js", function()
{
    describe("register(req, res)", function()
    {
        var name = chance.name();
        var buster = {
            firstName: name.split(" ")[0],
            lastName: name.split(" ")[1],
            email: chance.email(),
            username: name.split(" ").join(""),
            password: chance.sentence({words: 5})
        }

        it("should be able to be able to register a new user", function(done)
        {
            var options = {
                url: "https://" + config.server.ipaddress + ":" + config.server.port + "/register",
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                json: true,
                rejectUnauthorized: false,
                body: buster
            };

            request.post(options, function(error, response, body)
            {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it("should be able to login as the newly created user", function(done)
        {
            api_wrapper.make_api_call("/signIn",
            {
                "email": buster.email, 
                "password": buster.password
            },
            function (error, response, body)
            {
                assert.isTrue(body != undefined);
                assert.isTrue(body.ackValue != undefined);
                assert.isTrue(typeof body.authToken == 'string');
                done();
            });
        });
    });
});