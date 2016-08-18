//mnfp
$(document).ready(function () {
	mnfp = {
		version: '0.3.1'
	};
	mnfp.window = document.getElementById('netfree-popup-window');
	mnfp.main = document.getElementById('netfree-popup-window-main');
	mnfp.frame = document.getElementById('netfree-popup-window-iframe');
	mnfp.pull = document.getElementById('netfree-popup-window-hand-pull');
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

	//set page size
	mnfp.setPage = function(){
		mnfp.windowHeight = window.innerHeight;
		mnfp.windowWidth = window.innerWidth;
		if(Number(mnfp.main.style.top.slice(0,-2)) > (mnfp.windowHeight-90)){
			mnfp.main.style.top = (mnfp.windowHeight-90)+'px'
		}
	}
	mnfp.setPage()
	window.addEventListener('resize', mnfp.setPage);
	//load position settings
	chrome.storage.sync.get('allStPosition',function(get){
		if(get.allStPosition == true){
			chrome.storage.sync.get('allStPositionTop',function(get){
				mnfp.main.style.top = get.allStPositionTop
				mnfp.setPage()
			})
			chrome.storage.sync.get('allStPositionRightLeft',function(get){
				mnfp.window.className = get.allStPositionRightLeft
			})
		}
	})
	
	//mousedown
	mnfp.drag = false;
	mnfp.handDrag.addEventListener('mousedown', function(){
		mnfp.drag = true;
		mnfp.window.className += ' dragging';
		mnfp.frame.style.pointerEvents = 'none';
		document.body.style.webkitUserSelect = 'none';
	});

	//mousemove
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
	
	// set panel position function
	setPanelPosition = function(){
		chrome.storage.sync.get('allStPosition',function(get){
			if(get.allStPosition == true){
				chrome.storage.sync.set({'allStPositionTop':mnfp.main.style.top})
				chrome.storage.sync.set({'allStPositionRightLeft':mnfp.window.className})
			}
		})
	}
	//mouseup
	document.addEventListener('mouseup', function(e){
		if(mnfp.drag === false) return;
		mnfp.drag = false;
		mnfp.main.style.right = '';
		mnfp.main.style.left = '';
		mnfp.frame.style.pointerEvents = '';
		document.body.style.webkitUserSelect = '';
		if(e.target != mnfp.handDrag){
			mnfp.main.className = '';
		};
		if(e.pageX < (window.innerWidth/2)){
			mnfp.window.className = 'left';
		}else{
			mnfp.window.className = '';
		};
		setPanelPosition()
	});
	
	//load pull option
	function cancelHoverActive(){
		if(flag.hoverCanceled == true) return;
		cancelHover = document.createElement('style');
		cancelHover.type = 'text/css'
		cancelHoverText = document.createTextNode('\
			body #netfree-popup-window #netfree-popup-window-main.active{right:-170px;}\
			body #netfree-popup-window.dragging #netfree-popup-window-main.active{right:0;}\
			body #netfree-popup-window #netfree-popup-window-main.active.clicked{right:0;}\
			body #netfree-popup-window.left #netfree-popup-window-main.active{left:-170px;right:auto}\
			body #netfree-popup-window.left #netfree-popup-window-main.active.clicked{left:0;right:auto}\
			')
		cancelHover.appendChild(cancelHoverText)
		document.body.appendChild(cancelHover)
		flag.hoverCanceled = true;
	}
	function turnOnHoverActive(){
		if(typeof cancelHover != 'undefined'){
			cancelHover.remove()
			flag.hoverCanceled = false;
		}
	}	
	mnfp.pull.addEventListener('click',function(){
		mnfp.main.classList.add('clicked');
	})
	mnfp.main.addEventListener('mouseleave',function(){
		mnfp.main.classList.remove('clicked');
	})
	
	pullOption = function(){
		chrome.storage.sync.get('pull',function(get){
			if(get.pull == 'pullClick'){
				cancelHoverActive()
			}else{
				turnOnHoverActive()
			}
			
		})
	}
	chrome.storage.onChanged.addListener(function(){
		setPanelPosition()
		checkHide()
		pullOption()
	})
	pullOption()
});

flag = {};
//load hide settings (before the document is ready)
function checkHide(){
	chrome.storage.sync.get('allStHide',function(get){
		if(get.allStHide == true){
			if(flag.hided == true) return;
			hide = document.createElement('style');
			hide.type = 'text/css';
			hide.appendChild(document.createTextNode('#netfree-popup-window{display:none;}'));
			document.body.appendChild(hide);
			flag.hided = true;
		}else if(typeof hide !== typeof undefined){
			hide.remove()
			flag.hided = false;
		}
	})
}
checkHide()
