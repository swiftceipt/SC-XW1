var request_api = require('request');
var nodemailer = require('nodemailer');

exports.init = function(app)
{
    app.post("/contact/send", mail);

}
mail = function(req, res, next){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth:{
			user: "Admin@swiftceipt.com",
			pass:"password"
		}

	});
	var mailoptions = {
		from: "John Doe",
		to: "Admin@swiftceipt.com",
		subject: req.body.subject,
		message: req.body.message
	}
	transporter.sendMail(mailoptions,function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		}
		else{
			console.log("message sent");
			res.redirect('/');
		}

	});
}