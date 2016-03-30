$( init );
 
function init() {
  $('.list-group-item').draggable({
  	helper: "clone",
  	zIndex: 999999999,
  	stack: "#container",
  	cursor: "move", 
  	cursorAt: { top: -5, left: -5 }
  });
}
