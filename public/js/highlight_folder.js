window.onload = function()
{
    var url_list = window.location.href.split("/");
    if(url_list.indexOf("folders") < 0)
    {
        console.log("%cWe are not on a folder view, 'tis a shame", "font-family: fantasy; font-size: 1.5em");
    }
    else
    {
        var folder_name = url_list[url_list.length - 1];
        console.log("You are in folder " + folder_name);
    }
}