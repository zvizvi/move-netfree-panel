mnfp = {
	version: '0.1'
}
mnfp.pop = document.getElementById('netfree-popup-window-main');
mnfp.handDrag = document.createElement("span");
mnfp.handDrag.id = "netfree-popup-window-hand-drag";
mnfp.pop.appendChild(mnfp.handDrag);

mnfp.style = document.createElement("style");
mnfp.style.innerHTML = "#netfree-popup-window-hand-drag{position:absolute;top:-10px;left:0;right:0;height:10px;z-index:5;background-color:#769897;cursor:move;}";
mnfp.style.innerHTML += "#netfree-popup-window-main{user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;}";
mnfp.style.type = "text/css";
mnfp.pop.appendChild(mnfp.style);

mnfp.frame = document.getElementById('netfree-popup-window-iframe');

mnfp.drag = false;
mnfp.handDrag.addEventListener("mousedown", function(){
	mnfp.drag = true;
	mnfp.frame.style.pointerEvents = 'none';
});
document.addEventListener("mouseup", function(e){
	mnfp.drag = false;
	mnfp.frame.style.pointerEvents = '';
	if(e.target != mnfp.handDrag){
		mnfp.pop.className = '';
	}
});

mnfp.windowHeight = window.innerHeight-90;

document.addEventListener("mousemove", function(e){
	if(mnfp.drag === false) return;
	var y = e.clientY;
	if(y > 4 && y < mnfp.windowHeight){
		mnfp.pop.style.top = (y+5)+'px';
	}
	mnfp.pop.className = 'active';
});
