function popitup(url)
{
    var newwindow = window.open(url,'name','height = 200, width = 150');
    if (window.focus)
    {
        newwindow.focus();
    }
    return false;
}
