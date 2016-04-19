var Browser = require("zombie");
var config = require("../config/config.json");
var browser = new Browser({ debug: true });
var assert = require('chai').assert;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("Forget Password", function()
{
    it("should see the forget password");
    it("should not allow you to enter a invalid email");
    it("should allow you to enter a valid email");
    it("should tell you if you aren't recognized by the server");
    it("should confirm that you have sent an email");
});