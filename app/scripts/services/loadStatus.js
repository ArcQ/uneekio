app.service('loadStatus',function(){
	this.isShow = false;
	this.text = "none";
	this.isLoading = true;
	this.start = function(){
		this.isShow = true;
		this.isLoading = true;
	}
	this.success = function(msg){
		this.text = msg;
		this.isLoading = false;
	}
});