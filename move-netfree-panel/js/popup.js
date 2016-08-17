thisSposition = document.getElementById('this-site-position')
allSposition = document.getElementById('all-sites-position')
thisShide = document.getElementById('this-site-hide')
allShide = document.getElementById('all-sites-hide')

allSposition.addEventListener('change',function(){
	if(this.checked == true){
		thisSposition.disabled=true
		thisSposition.parentElement.className = 'disabled'
	}else{
		thisSposition.disabled=false
		thisSposition.parentElement.className = ''
	}
})
allShide.addEventListener('change',function(){
	if(this.checked == true){
		thisShide.disabled=true
		thisShide.parentElement.className = 'disabled'
	}else{
		thisShide.disabled=false
		thisShide.parentElement.className = ''
	}
})
