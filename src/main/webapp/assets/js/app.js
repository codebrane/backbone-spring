var CourseManager = new Marionette.Application();

CourseManager.addRegions({
	headerRegion: "#header-region",
    coursesRegion: "#courses-region",
	dialogRegion: Marionette.Region.Dialog.extend({
		el: "#dialog-region"
	})
});

CourseManager.navigate = function(route, options) {
	// sets options to {} if none are provided
	options || (options = {});
	// navigate doesn’t just change the URL fragment, it also adds the new URL to the browser’s history.
	// This, in turn, makes the browser’s back and forward buttons behave as expected
	Backbone.history.navigate(route, options);
};

CourseManager.getCurrentRoute = function() {
	return Backbone.history.fragment;
};

// once all initializers have been run, the “initialize:after” event is triggered
CourseManager.on("initialize:after", function() {
	if (Backbone.history) {
		Backbone.history.start();
		
		// URL fragment is the string that comes after index.html, i.e. looking for #
		if (this.getCurrentRoute() === "") {
			CourseManager.trigger("courses:list");
		}
	}
});
