exports.init = function(app)
{
    app.get("*", function(request, response)
    {
        response.render("login_tester.ejs");
    });

    app.post("/login", check_login);
}

check_login = function(request, response)
{
    console.log("\t" + request.body.email);
    console.log("\t" + request.body.password);
    response.render("login_tester.ejs");
}