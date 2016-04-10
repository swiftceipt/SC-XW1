
var request_api = require('request');
var validation = require('./validate');

exports.init = function(app)
{
	app.get("/dashboard", is_logged_in, f1);
	 app.get("/how_it_works", how_it_works);
	 app.get("/support", support);
	 app.get("/services", services);
	 app.get("/contact", contact);
	 app.get("/about", about);
}

// out side login pages
support = function(request, response)
{
    response.render("support", {session: request.session});
}

how_it_works = function(request, response)
{
    response.render("how_it_works", {session: request.session});
}
about = function(request,response)
{
	response.render("about",{session: request.session});
}
contact = function(request,response)
{
	response.render("contact",{session: request.session});
}
services = function(request,response)
{
	response.render("services",{session: request.session});
}

//end of other pages


parse_date_string = function(date_str){
	result = {};
	var elements = date_str.split(" ");
	date = elements[0].split("-");
	time = elements[1].split(":");
	var year = parseInt(date[0]);
	var month = parseInt(date[1]);
	var day = parseInt(date[2]);
	var hour = parseInt(time[0]);
	var min = parseInt(time[1]);
	var sec = parseFloat(time[2]);
	result.year = year;
	result.month = month;
	result.day = day;
	result.hour = hour;
	result.min = min;
	result.sec = sec;
	return result;
}
by_year = function(receipts)
{
	var result = {}
	for(var i = 0; i < receipts.length; i++){
		date = parse_date_string(receipts[i].date_created);
		year = date.year;
		total = parseFloat(receipts[i].total); 

		if(result.hasOwnProperty(year)){
			result[year] += total;
		}
 		else{
 			result[year] = total;
 		}
	}
	return result;

}
//give the year object all the month spendings as 0 as initial value
//year is a json object
initialize_month = function(){
	var year = {}
	year[1] = 0;
	year[2] = 0;
	year[3] = 0;
	year[4] = 0;
	year[5] = 0;
	year[6] = 0;
	year[7] = 0;
	year[8] = 0;
	year[9] = 0;
	year[10] = 0;
	year[11] = 0;
	year[12] = 0;
	return year;
}
by_month = function(receipts){
	var result = {}
	for(var i = 0; i < receipts.length; i++){
		date = parse_date_string(receipts[i].date_created);
		year = date.year;
		month = date.month;
		total = parseFloat(receipts[i].total); 

		if(result.hasOwnProperty(year)){
			result[year][month] += total;
		}
		//if result does not even have this years info
 		else{
 			result[year] = initialize_month();
 			result[year][month] = total;
 		}
	}
	return result;

}
initialize_month_store = function(){
	var year = {}
	year[1] = {};
	year[2] = {};
	year[3] = {};
	year[4] = {};
	year[5] = {};
	year[6] = {};
	year[7] = {};
	year[8] = {};
	year[9] = {};
	year[10] = {};
	year[11] = {};
	year[12] = {};
	return year;
}

by_store = function(receipts){
	var result = {}
	for(var i = 0; i < receipts.length; i++){
		store_name = receipts[i].name;
		date = parse_date_string(receipts[i].date_created);
		year = date.year;
		month = date.month;
		total = parseFloat(receipts[i].total); 

		if(result.hasOwnProperty(year)){
			if(result[year][month].hasOwnProperty(store_name)){
					result[year][month][store_name] += total;
				}
				else{
					result[year][month][store_name] = total;
				}
		}
		//if result does not even have this years info
 		else{
 			result[year] = initialize_month_store();
 			result[year][month][store_name] = total;

 		}
	}
	return result;
}





f1 = function(request, response)
{
	var authToken = request.session.authToken;

	var options = {
        url: "https://tenv-service.swiftceipt.com/getNewReceipts",
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true,
        body: 
        {
            // use the token that we're provided
            // used date that occurs way before swiftCeipt
            // was made to get all of them
            authToken: request.session.authToken,
            lastUpdateTimestamp: "2000-01-01 00:00:00.0"
        }
    };

    request_api.post(options, function(error, api_response, body)
    {
        if(!error)
        {//need to handle the case when the response (body.receipts) is null;
        	//i dont know when it will be null but we need to handle this to prevent the app from crashing
        	sc_data = body.receipts;
        	parsed = {};
            try
            {
                parsed.by_year = by_year(sc_data);
                parsed.by_month = by_month(sc_data);
                parsed.by_store = by_store(sc_data); 
            	response.render("dashboard", {parsed: parsed, session: request.session} );
            }
            catch(err)
            {
                console.log(error);
                sc_data = null;
                response.render("dashboard", {sc_data: sc_data, session: request.session} );
            }
        }
        else
        {
            console.log(error);
            sc_data = null;
            response.render("dashboard", {sc_data: sc_data, session: request.session} );

            //response.render("receipts", {receipts: "None"});
        }
    });
	}