CourseManager.module("AboutApp.Show", function(Show, CourseManager, Backbone, Marionette, $, _) {
	Show.Controller = {
		showAbout: function() {
			var view = new Show.Message();
			CourseManager.coursesRegion.show(view);
		}
	};
});