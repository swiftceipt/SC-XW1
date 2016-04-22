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
            assert.isTrue(contains(".jumbotron", "get started"));
            assert.isTrue(contains("li.ui-draggable", "The Home Depot"));

        }).then(done, done);
    })

    it("should be able to click on a receipt to see its information", function(done)
    {
        assert.isBelow(browser.query("#receiptArea").innerHTML.indexOf("The Home Depot"), 0);

        browser.window.$(browser.document).on("click", "#840", function()
        {
            assert.isTrue(contains("#receiptArea", "RAPID SET SET CONTROL"));
        });

        done();
    });

    it("should be able to see the original HTML page", function(done)
    {
        var button = '<button type="button" class="btn btn-default">Original Email</button>'
        browser.window.$(browser.document).on("click", "#840", function()
        {
            assert.isTrue(contains("#receiptArea", button));
        });

        done();
    });

    it("should be able to go to the popped out receipt page", function(done)
    {
        browser.clickLink("a[target='_blank']").then(function()
        {
            assert.isTrue(contains(".col-md-6:nth-child(2)", "WEST MIFFLIN, PA"));
            done();
        });
    });

    it("should be able to see the Google Map", function(done)
    {
        assert.isTrue(contains(".col-md-6:nth-child(2)", "Google Maps JavaScript API"));
        done();
    });
});