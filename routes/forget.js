var validate = require("./validate");

forgetPath = function(request, response)
{
    var content;
    if(validate.isEmail(request.body.email))
    {
        response.render("login", {
            message : {
                type: "info",
                content: "An reset email has been sent to \n " + request.body.email
            }
        });
    }
    else
    {
        response.render("login", {
            message : {
                type: "warning",
                content: "That's not a valid email"
            }
        });
    }

}

module.exports = {
    forgetPath: forgetPath
}