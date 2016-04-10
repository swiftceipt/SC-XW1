function renameForm(i, name) {
    // turns the folder li into a text box to rename the folder
    var renameForm = $("<form><input type='text' name='newFolderName' placeholder='" + name + "'></form>");
    $("#folder_" + i).replaceWith(renameForm);
    renameForm.submit(function()
    {
        $.ajax({
            type: "POST",
            url: "/rename_folder/" + name,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                newFolderName: renameForm.find("input").val()
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
        return false;
    } )
}

function nameFolder() {
    var nameForm = $("<form><input type='text' name='folderName' placeholder='Folder Name'></form>");
    console.log(nameForm);
    // turns the 'create folder' button into a text box
    $("#nameFolder").replaceWith(nameForm);
    nameForm.submit(function() {
        $.ajax({
            type: "POST",
            url: "/create_folder",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                folderName: nameForm.find("input").val()
            }),
            success: function(data, status)
            {
                //window.reload();
                window.location.href = '/receipts';
                toastr.success( "Created folder successfully");
            },
            error: function(xhr, status, message)
            {
                if(xhr.responseJSON.error == 'This folder already exists')
                {
                    toastr["warning"]("A folder with this name already exists! Please choose a new name.");
                }
                else
                {
                    toastr["error"]( "Sorry, something went wrong.");
                }
                  
            }
        });
        return false;
    })
}

function deleteFolder(folderName) {
    console.log('asdf');
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
            toastr["error"]( "Sorry, something went wrong.");
        }
    });
    return false;
}

function showModal(folderName) {
    var replacementButton = $("<button id='confirmDelete' onclick='deleteFolder(&quot;" + folderName + "&quot;)' type='button' class='btn btn-danger'>Confirm</button>")
    $("#confirmDelete").replaceWith(replacementButton);
    $("#modal").modal('show');
}