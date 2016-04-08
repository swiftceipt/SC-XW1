function renameForm(i, name) {
    // turns the folder li into a text box to rename the folder
    $("#folder_" + i).replaceWith("<form action='/rename_folder/" + name + "' method='post'><input type='text' name='newFolderName' placeholder='" + name + "'></form>")
}

function nameFolder() {
	// turns the 'create folder' button into a text box
	$("#nameFolder").replaceWith("<form action='/create_folder' method='post'><input type='text' name='folderName' placeholder='Folder Name'></form>")
}