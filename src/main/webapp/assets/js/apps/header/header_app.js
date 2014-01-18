CourseManager.module("HeaderApp", function(Header, CourseManager, Backbone, Marionette, $, _) {
	var API = {
		listHeader: function() {
			Header.List.Controller.listHeader();
		}
	};
	
	CourseManager.commands.setHandler("set:active:header", function(name){
		CourseManager.HeaderApp.List.Controller.setActiveHeader(name);
	});
	
	Header.on("start", function(){
		API.listHeader();
	});
});