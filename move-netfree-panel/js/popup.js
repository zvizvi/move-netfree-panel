//panel position

//thisStPosition = document.getElementById('this-site-position')
allStPosition = document.getElementById('all-sites-position')
function allStPositionChecked(){
	allStPosition.checked = true
	//thisStPosition.disabled = true
	//thisStPosition.parentElement.className = 'disabled'
}
function allStPositionUnChecked(){
	allStPosition.checked = false
	//thisStPosition.disabled = false
	//thisStPosition.parentElement.className = ''
}
chrome.storage.sync.get('allStPosition',function(get){
	if(get.allStPosition == true){
		allStPositionChecked()
	}
})

allStPosition.addEventListener('change',function(){
	if(this.checked == true){
		allStPositionChecked()
		chrome.storage.sync.set({'allStPosition': true})
	}else{
		allStPositionUnChecked()
		chrome.storage.sync.remove('allStPosition')
		chrome.storage.sync.remove('allStPositionTop')
		chrome.storage.sync.remove('allStPositionRightLeft')
	}
})

//hide panel
//thisStHide = document.getElementById('this-site-hide')
allStHide = document.getElementById('all-sites-hide')
function allStHideChecked(){
	allStHide.checked = true
	//thisStHide.disabled = true
	//thisStHide.parentElement.className = 'disabled'
}
function allStHideUnChecked(){
	allStHide.checked = false
	//thisStHide.disabled = false
	//thisStHide.parentElement.className = ''
}
chrome.storage.sync.get('allStHide',function(get){
	if(get.allStHide == true){
		allStHideChecked()
	}
})

allStHide.addEventListener('change',function(){
	if(this.checked == true){
		allStHideChecked()
		chrome.storage.sync.set({'allStHide': true})
	}else{
		allStHideUnChecked()
		chrome.storage.sync.remove('allStHide')
	}
})

//pull panel.
pullHover = document.getElementById('mnfp-pull-hover')
pullClick = document.getElementById('mnfp-pull-click')
pullHover.addEventListener('change',setPullOption)
pullClick.addEventListener('change',setPullOption)
function setPullOption(){
	if(pullHover.checked == true){
		chrome.storage.sync.set({'pull': 'pullHover'})
	}else if(pullClick.checked == true){
		chrome.storage.sync.set({'pull': 'pullClick'})
	}
}
chrome.storage.sync.get('pull',function(get){
	window[get.pull].checked = true;
})

