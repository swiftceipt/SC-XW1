exports.init = function(app)
{
    app.get("*", function(request, response)
    {
        response.render("login_tester.ejs");
    });
}