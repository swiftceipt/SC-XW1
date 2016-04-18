var Browser = require("zombie");
var config = require("../config/config.json");
var browser = new Browser();
var assert = require('chai').assert;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("Walking through the login process", function()
{
    it("should have defined headless browser", function(done)
    {
        assert.isTrue(typeof browser != "undefined");
        assert.isTrue(browser instanceof Browser);
        done();
    });

    it("should visit the site and see the login form", function(done)
    {
        browser.visit("https://" + config.server.ipaddress + ":" + config.server.port + "/login").then(function()
        {
            assert.isTrue(browser.success);
            assert.isTrue(browser.query("button[type='submit']").innerHTML == "Sign in");
        }).then(done, done);
    });

    it("should not be able to login with wrong credentials", function(done)
    {
        browser
        .fill('input[name="email"]', "wrongname")
        .fill('input[name="password"]', "wrongpassword")
        .pressButton('button[type="submit"]', function()
        {
            assert.isTrue(browser.query("button[type='submit']").innerHTML == "Sign in");
            done();
        });
    });

    it("should be able to login with valid credentials", function(done)
    {
        browser
        .fill('input[name="email"]', "jack@cirno.de")
        .fill('input[name="password"]', "1234")
        .pressButton('button[type="submit"]', function()
        {
            assert.isTrue(browser.query("h2").innerHTML == "Yearly Spendings");
            done();
        });
    });
});