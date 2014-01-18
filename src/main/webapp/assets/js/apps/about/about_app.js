CourseManager.module("AboutApp", function(AboutApp, CourseManager, Backbone, Marionette, $, _) {
	AboutApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			// showAbout() in this file
			"about": "showAbout"
		}
	});
	
	var API = {
		showAbout: function() {
			AboutApp.Show.Controller.showAbout();
			CourseManager.execute("set:active:header", "about");
		}
	};
	
	CourseManager.on("about:show", function(){
		CourseManager.navigate("about");
		API.showAbout();
	});
	
	CourseManager.addInitializer(function() {
		new AboutApp.Router({
			controller: API
		});
	});
});