CourseManager.module("HeaderApp.List", function(List, CourseManager, Backbone, Marionette, $, _) {
	List.Controller = {
		listHeader: function() {
			var links = CourseManager.request("header:entities");
			var headers = new List.Headers({collection: links});
			
			headers.on("brand:clicked", function(){
				CourseManager.trigger("courses:list");
			});
			
			headers.on("itemview:navigate", function(childView, model){
				var trigger = model.get("navigationTrigger");
				CourseManager.trigger(trigger);
			});
			
			CourseManager.headerRegion.show(headers);
		},
		
		setActiveHeader: function(headerUrl) {
			var links = CourseManager.request("header:entities");
			var headerToSelect = links.find(function(header){
				return header.get("url") === headerUrl;
			});
			headerToSelect.select();
			links.trigger("reset");
		}
	};
});