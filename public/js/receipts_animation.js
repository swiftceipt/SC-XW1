window.onload = function()
{
    // apply a click handler to each list group item
    var list_group_items = document.getElementsByClassName("list-group-item");
    var responseArea = document.getElementById("receiptArea");

    for(var i = 0; i < list_group_items.length; i ++)
    {
        list_group_items[i].onclick = function()
        {
            // render loading icon and swap around 'active' class
            responseArea.innerHTML = "<center><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span></center>";

            var current = document.getElementsByClassName("active");
            if(current.length != 0)
            {
                current[0].className = current[0].className.split(" ")[0];
            }
            this.className += " active";

            $.ajax({
                type: "GET",
                url: "/receipts/" + this.id,
                success: function(data, status)
                {
                    responseArea.innerHTML = data;
                },
                error: function(xhr, status, message)
                {
                    window.location = "/login";
                    window.reload();
                }
            });
        }
    }
};