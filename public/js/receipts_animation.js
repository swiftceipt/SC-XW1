window.onload = function()
{
    // apply a click handler to each list group item
    var list_group_items = document.getElementsByClassName("list-group-item");

    for(var i = 0; i < list_group_items.length; i ++)
    {
        list_group_items[i].onclick = function()
        {
            alert("show me the money");
        }
    }
};