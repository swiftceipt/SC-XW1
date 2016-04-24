$( init );
 
function init() {
  $('.list-group-item').draggable({
  	helper: "clone",
  	zIndex: 999999999,
  	stack: "#container",
  	cursor: "move", 
  	opacity: 0.75,
    scroll: false,
    appendTo: "body",
  	cursorAt: { top: 30, left: 20 },
    start: function( event, ui ) {
      var url = window.location.href.split("/");
      var folder_id = url[url.length-1];
      if(folder_id != "receipts"){
        $('#delete').show();
      }
    },
    stop: function( event, ui ) {
      $('#delete').hide();
    }
  	//stop:handleDragStop
  });
  $('.folder').droppable( {
    drop: handleDropStop,
    accept: ".list-group-item",
    hoverClass: "ui-state-hover",
  } );
  $('#delete').droppable({
    drop: handleRemove,
    accept: ".list-group-item",
    hoverClass: "ui-state-hover",
  });
}
function handleDropStop( event, ui ) {
  var element_id = ui.draggable.attr("id");
  var element_drop_id = event.target.id;
  var receiptName = document.getElementById(element_id).getElementsByTagName("h4")[0].innerHTML;
  console.log(receiptName);
    $.ajax({
      type: "GET",
      url: "/add/" + element_id +"/" + element_drop_id,
      contentType: "application/json",
      dataType: "json",
      success: function(data, status)
      {
        //window.reload();
        toastr.success( "you have successfully dragged receipt"+ " " + receiptName 
          + " " +"on to" + " " + "folder"+ " " + element_drop_id);
      },
      error: function(xhr, status, message)
      {
        console.log("frontend error");
        console.log(message);
        toastr.success( "something was wrong, please try again! ");
          //toast
      }
    });
    //toastr.success( "you have successfullly dragged "+ element_id + "&nbspon to" +element_drop_id);


}
function handleRemove(event,ui){
  var element_id = ui.draggable.attr("id");
  //handle the case when user are under /receipts
  //handle reload to get the most updated version of folder
  var url = window.location.href.split("/");
  var folder_id = url[url.length-1];
  $.ajax({
      type: "GET",
      url: "/remove/" + element_id + "/"+folder_id,
      success: function(data, status)
      {
        toastr.success( "you have successfully removed receipt " 
          + element_id + " from folder " + folder_id);
        console.log(location.href);

        window.location = "/folders/" + folder_id;

      },
      error: function(xhr, status, message)
      {
        toastr.error( "something was wrong, please try again! ");
          //toast
      }
    });
}





