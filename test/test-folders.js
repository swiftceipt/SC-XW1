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

describe("Folder Functionality", function()
{
    this.timeout(0);
    var url = "https://" + config.server.ipaddress + ":" + config.server.port;

    it("should display the folders in the sidebar");
    it("if there is no 'food' folder defined, should be able to create it");
    it("should be able to change the folder name to 'delicious food'");
    it("should be able to delete the folder");
})