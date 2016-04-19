var Browser = require("zombie");
var config = require("../config/config.json");
var browser = new Browser({ debug: true });
var assert = require('chai').assert;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/*
    Sees whether or not the browser can query for the selector and kind the key
    In the selected innerHTML
*/
function contains(selector, key)
{
    return browser.query(selector).innerHTML.indexOf(key) >= 0; 
}

describe("Forget Password", function()
{
    var url = "https://" + config.server.ipaddress + ":" + config.server.port;

    it("should see the forget password", function(done)
    {
        browser.visit(url + "/login").then(function()
        {
            assert.isTrue(contains("form", "Forgot Password?"));
        })
    });
    it("should not allow you to enter a invalid email");
    it("should allow you to enter a valid email");
    it("should tell you if you aren't recognized by the server");
    it("should confirm that you have sent an email");
});