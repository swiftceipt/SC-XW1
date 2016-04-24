var Browser = require("zombie");
var config = require("../config/config.json");
var browser = new Browser({ debug: true });
var assert = require('chai').assert;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function contains(selector, key)
{
    return browser.query(selector).innerHTML.indexOf(key) >= 0; 
}

describe("Looking through all the content", function()
{

	this.timeout(0);
    var url = "https://" + config.server.ipaddress + ":" + config.server.port;
    it("should go back the the receipts page by clicking the logo", function(done){
    	//login
    	browser.visit(url + "/login").then(function(){
    		browser
        	.fill('input[name="email"]', "jack@cirno.de")
        	.fill('input[name="password"]', "1234")
        	.pressButton('button[type="submit"]',function(){

        		var logo = '<a href="/receipts" class="navbar-brand"><img src="/images/title-logo-1016.png"></a>'
    			browser.window.$(browser.document).on("click", ".navbar-brand", function()
        		{
            		assert.isTrue(contains(".jumbotron", "get started"));
        		});
        		done();
        	});
    	});
    });


    it("should see the name on the nav bar", function(done){
    	assert.isTrue(contains(".navbar-right", "test@ceet.us"));
    	done();
    });
    
    it("should go back to to home page by clicking logout", function(done){
    	var logout = '<li><a href="/logout">Logout</a></li>'
    	browser.window.$(browser.document).on("click", logout, function()
        	{
            	assert.isTrue(contains(".intro-message", "Manage Receipts Effortlessly Forever"));
        	});
        done();
    });
    
});
