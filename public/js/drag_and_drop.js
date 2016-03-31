$( init );
 
function init() {
  $('.list-group-item').draggable({
  	helper: "clone",
  	zIndex: 999999999,
  	stack: "#container",
  	cursor: "move", 
  	opacity: 0.65,
  	cursorAt: { top: 30, left: 20 },
  	//stop:handleDragStop
  });
  $('.folder').droppable( {
    drop: handleDropStop,
    accept: ".list-group-item",
    hoverClass: "ui-state-hover",
  } );
}
function handleDropStop( event, ui ) {
  var element_id = ui.draggable.attr("id");
  var element_drop_id = event.target.id;
  alert( "you have dragged"+ " "+ element_id + " on to " +element_drop_id );
}
