forgetPath = function(request, response)
{
    response.render("login", {
        message : {
            type: "warning",
            content: "You seem to have forgotten your password"
        }
    });
}

module.exports = {
    forgetPath: forgetPath
}