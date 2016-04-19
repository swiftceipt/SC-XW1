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
    this.timeout(0);
    var url = "https://" + config.server.ipaddress + ":" + config.server.port;

    it("should see the forget password", function(done)
    {
        browser.visit(url + "/login").then(function()
        {
            assert.isTrue(contains("form", "Forgot Password?"));
            done();
        })
    });

    it("should not allow you to enter a invalid email", function(done)
    {
        browser.pressButton("button[data-target='#forgetModal']", function()
        {
            browser
            .fill("input#recipient-name", "this is not an email")
            .pressButton('button#forget_pw_button', function()
            {
                assert.isTrue(contains("div.alert-warning", "That's not a valid email"));
                done();
            });
        }); 
    });

    it("should allow you to enter a valid email and confirm a sent email", function()
    {
        browser.pressButton("button[data-target='#forgetModal']", function()
        {
            browser
            .fill("input#recipient-name", "jack@cirno.de")
            .pressButton('button#forget_pw_button', function()
            {
                assert.isTrue(contains("div.alert-warning", "A reset email has been sent to jack@cirno.de"));
                done();
            });
        });
    });

    it("should tell you if you aren't recognized by the server");
});