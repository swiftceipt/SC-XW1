window.onload = function()
{
    // apply a click handler to each list group item
    var list_group_items = document.getElementsByClassName("list-group-item");
    var responseArea = document.getElementById("receiptArea");

    for(var i = 0; i < list_group_items.length; i ++)
    {
        list_group_items[i].onclick = function()
        {
            responseArea.innerHTML = "<img src = '/images/reload.svg'>";
            $.ajax({
                type: "GET",
                url: "/receipts/" + this.id,
                success: function(data, status)
                {
                    responseArea.innerHTML = data;
                },
                error: function(xhr, status, message)
                {
                    responseArea.innerHTML = "<h1>Oops: There was an error</h1>" + 
                                    "<p style = 'font-family: monospace'>" +
                                    message + "</p>";
                }
            });
        }
    }
};