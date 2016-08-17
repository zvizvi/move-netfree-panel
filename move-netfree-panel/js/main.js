$(document).ready(function () {
	mnfp = {
		version: '0.2.5'
	};
	mnfp.window = document.getElementById('netfree-popup-window');
	mnfp.main = document.getElementById('netfree-popup-window-main');
	mnfp.handDrag = document.createElement('span');
	mnfp.handDrag.id = 'netfree-popup-window-hand-drag';
	mnfp.main.appendChild(mnfp.handDrag);

	mnfp.style = document.createElement('style');
	mnfp.style.innerHTML = '#netfree-popup-window-hand-drag{position:absolute;top:-10px;left:0;right:0;height:10px;z-index:5;background-color:#769897;cursor:move;}';
	mnfp.style.innerHTML += '#netfree-popup-window #netfree-popup-window-main{user-select:none;-webkit-user-select:none;-webkit-transition:300ms ease-in-out right,500ms opacity;transition:300ms ease-in-out right,500ms opacity}';
	mnfp.style.innerHTML += '#netfree-popup-window.left #netfree-popup-window-main{left:-170px;right:auto;-webkit-transition:300ms ease-in-out left,500ms opacity;transition:300ms ease-in-out left,500ms opacity;}#netfree-popup-window.left #netfree-popup-window-hand-pull{left:auto;right:-30px;-webkit-transform:rotateZ(180deg);transform:rotateZ(180deg);height:105px;}#netfree-popup-window.left #netfree-popup-window-main.active{left:0;}';
	mnfp.style.innerHTML += '#netfree-popup-window.dragging #netfree-popup-window-main{-webkit-transition:0ms right,0ms left,500ms opacity;transition:0ms right,0ms left,500ms opacity;opacity:0.8;}';

	mnfp.style.type = 'text/css';
	mnfp.main.appendChild(mnfp.style);

	mnfp.frame = document.getElementById('netfree-popup-window-iframe');

	mnfp.drag = false;
	mnfp.handDrag.addEventListener('mousedown', function(){
		mnfp.drag = true;
		mnfp.window.className += ' dragging';
		mnfp.frame.style.pointerEvents = 'none';
	});
	document.addEventListener('mouseup', function(e){
		if(mnfp.drag === false) return;
		mnfp.drag = false;
		mnfp.main.style.right = '';
		mnfp.main.style.left = '';
		mnfp.frame.style.pointerEvents = '';
		if(e.target != mnfp.handDrag){
			mnfp.main.className = '';
		};
		if(e.pageX < (window.innerWidth/2)){
			mnfp.window.className = 'left';
		}else{
			mnfp.window.className = '';
		};
	});
	mnfp.setPage = function(){
		mnfp.windowHeight = window.innerHeight;
		mnfp.windowWidth = window.innerWidth;
		if(Number(mnfp.main.style.top.slice(0,-2)) > (mnfp.windowHeight-90)){
			mnfp.main.style.top = (mnfp.windowHeight-90)+'px'
		}
	}
	mnfp.setPage()
	window.addEventListener('resize', mnfp.setPage);

	document.addEventListener('mousemove', function(e){
		if(mnfp.drag === false) return;
		var y = e.clientY;
		var x = mnfp.windowWidth-e.clientX;
		if(y > 4 && y < (mnfp.windowHeight - 90)){
			mnfp.main.style.top = (y+5)+'px';
		};
		if(x < 170){
			mnfp.main.style.right = '';
			mnfp.window.className = 'dragging'
		}else if(e.clientX < 170){
			mnfp.main.style.right = 'auto';
			mnfp.main.style.left = '0px';
			mnfp.window.classList.add('left')
		}else{
			mnfp.main.style.right = (x-100)+'px';
			mnfp.main.style.left = 'auto';
		}
		mnfp.main.className = 'active';
	});
});
