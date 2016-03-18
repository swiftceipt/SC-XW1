var validate = require("./validate");

forgetPath = function(request, response)
{
    var content;
    if(validate.isEmail(request.body.email))
    {
        content = "You seem to have forgotten your password\nWhy don't you check your email at: " + request.body.email
    }
    else
    {
        content = "That's not a valid email";
    }

    response.render("login", {
        message : {
            type: "warning",
            content: content
        }
    });
}

module.exports = {
    forgetPath: forgetPath
}