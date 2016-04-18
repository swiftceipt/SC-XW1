var Browser = require("zombie");
var config = require("../config/config.json");
var browser = new Browser();
var assert = require('chai').assert;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("Looking through receipts", function()
{
    this.timeout(0);
    var url = "https://" + config.server.ipaddress + ":" + config.server.port;

    it("should have defined headless browser and log in ", function(done)
    {
        assert.isTrue(typeof browser != "undefined");
        assert.isTrue(browser instanceof Browser);

        browser.visit(url + "/login").then(function()
        {
            assert.isTrue(browser.success);
            assert.isTrue(browser.query("button[type='submit']").innerHTML == "Sign in");
        }).then(done, done);
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

    it("should navigate to the receipts page and see the Home Depot", function(done)
    {
        browser.visit(url + "/receipts").then(function()
        {
            // look for place holder
            assert.isAbove(browser.query(".jumbotron").innerHTML.indexOf("get started"), -1);
            assert.isAbove(browser.query("li.ui-draggable").innerHTML.indexOf("The Home Depot"), -1);

        }).then(done, done);
    })

    it("should be able to click on a receipt to see its information ", function(done)
    {
        assert.isBelow(browser.query("#receiptArea").innerHTML.indexOf("The Home Depot"), 0);

        browser.window.$(browser.document).on("click", "#840", function()
        {
            assert.isAbove(browser.query("#receiptArea").innerHTML.indexOf("RAPID SET SET CONTROL"), -1);
        });

        done();
    });
});