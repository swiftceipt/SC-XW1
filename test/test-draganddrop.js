var dragMock = require('drag-mock');
var Browser = require("zombie");
var config = require("../config/config.json");
var browser = new Browser({ debug: true });
var assert = require('chai').assert;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function contains(selector, key)
{
    return browser.query(selector).innerHTML.indexOf(key) >= 0; 
}


function exists(id){
	if(browser.document.getElementById(id)){
    	return true;
	}
	else {
    	return false;
	}
}

describe('testing drag and drop functionalities', function() {
	this.timeout(0);
    var url = "https://" + config.server.ipaddress + ":" + config.server.port;
    it('should moves receipts into and out of folder properly', function(done) {
    //login
    	browser.visit(url + "/login").then(function(){
    		browser
        	.fill('input[name="email"]', "jack@cirno.de")
        	.fill('input[name="password"]', "1234")
        	.pressButton('button[type="submit"]',function(){

        		var receipt = document.querySelector('#830');
				var folder = '<a href="/folders/test"><span>test</span></a>';
				var delete_button = browser.document.querySelector('#delete');
				dragMock.dragStart(receipt).drop(folder);

				browser.window.$(browser.document).on("click", folder, function()
        		{

            		browser.window.$(browser.document).on("click", "#830", function()
        			{		
            			assert.isTrue(contains("#receiptArea", "RAPID SET SET CONTROL"));
       				});
       				dragMock.dragStart(receipt).drop(delete_button);

       				assert.isTrue(exists('#840'));
       				assert.isFalse(exists('#830'));
        		});
        	});
    	});
    	done();
	});

});