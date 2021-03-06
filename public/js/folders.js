function renameForm(i, name)
{
    name = name.toUpperCase();
    // turns the folder li into a text box to rename the folder
    var renameForm = $("<form><input type='text' name='newFolderName' placeholder='" + name + "'></form>");
    var selector = "[id='" + name + "']"
    $(selector).replaceWith(renameForm);
    renameForm.submit(function() {
        var folderName = renameForm.find("input").val();
        if (!isValidFolderName(folderName))
        {
            toastr["warning"]("Please choose a folder name that contains only letters, numbers, and is less than 40 characters long.")
        }
        else
        {
            $.ajax({
                type: "POST",
                url: "/rename_folder/" + name,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    newFolderName: folderName
                }),
                success: function(data, status)
                {
                    //window.reload();
                    window.location.href = '/receipts';
                    toastr.success( "Renamed folder successfully");
                },
                error: function(xhr, status, message)
                {
                    console.log("frontend error");
                    console.log(xhr.responseJSON.status);
                    if(xhr.responseJSON.status == 'already exists')
                    {
                        toastr["warning"]("A folder with this name already exists! Please choose a new name.");
                    }
                    else
                    {
                        toastr["error"]( "Sorry, something went wrong.");
                    }
                      
                }
            });
        }
        return false;
    } )
}

function nameFolder()
{
    var nameForm = $("<form><input type='text' name='folderName' placeholder='Folder Name'></form>");
    // turns the 'create folder' button into a text box
    $("#nameFolder").replaceWith(nameForm);
    nameForm.submit(function() {
        var folderName = nameForm.find("input").val();
        folderName = folderName.toUpperCase();
        if (!isValidFolderName(folderName))
        {
            toastr["warning"]("Please choose a folder name that contains only letters, numbers, and is less than 40 characters long.")
        }
        else
        {
            $.ajax({
                type: "POST",
                url: "/create_folder",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    folderName: folderName
                }),
                success: function(data, status)
                {
                    //window.reload();
                    window.location.href = '/receipts';
                    toastr.success( "Created folder successfully");
                },
                error: function(xhr, status, message)
                {
                    if(xhr.responseJSON != undefined && xhr.responseJSON.error == 'This folder already exists')
                    {
                        toastr["warning"]("A folder with this name already exists! Please choose a new name.");
                    }
                    else if (xhr.responseJSON == undefined)
                    {
                        location.href = "/logout";
                    }
                    else
                    {
                        toastr["error"]( "Sorry, something went wrong.");
                    }
                      
                }
            });
        }
        return false;
    })
}

function deleteFolder(folderName)
{
    $.ajax({
        type: "POST",
        url: "/delete_folder/" + folderName,
        contentType: "application/json",
        dataType: "json",
        success: function(data, status)
        {
            //window.reload();
            window.location.href = '/receipts';
            toastr.success( "Deleted folder successfully");
        },
        error: function(xhr, status, message)
        {
            if(xhr.responseText.indexOf("Login template largely") > 0)
            {
                location.href = "/logout";
            }
            else
            {
                toastr["error"]( "Sorry, something went wrong.");
            }
        }
    });
    return false;
}

function showModal(folderName)
{
    var replacementButton = $("<button id='confirmDelete' onclick='deleteFolder(&quot;" + folderName + "&quot;)' type='button' class='btn btn-danger'>Confirm</button>")
    $("#confirmDelete").replaceWith(replacementButton);
    $("#modal").modal('show');
}

function isValidFolderName(folderName)
{
    var regex = /^[a-zA-Z0-9][a-zA-Z0-9 ]{0,40}$/
    return regex.test(folderName);
}