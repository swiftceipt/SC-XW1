function renameForm(i, name) {
    // turns the folder li into a text box to rename the folder
    toastr.success('yes');
    $("#folder_" + i).replaceWith("<form action='/rename_folder/" + name + "' method='post'><input type='text' name='newFolderName' placeholder='" + name + "'></form>")
}

function nameFolder() {
	var nameForm = $("<form><input type='text' name='folderName' placeholder='Folder Name'></form>");
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
		        console.log("frontend error");
		        console.log(xhr.responseJSON.error);
		        if(xhr.responseJSON.error == 'This folder already exists')
		        {
		        	toastr["warning"]("This folder already exists! Please choose a new name");
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

