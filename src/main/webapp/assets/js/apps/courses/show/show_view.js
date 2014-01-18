CourseManager.module("CoursesApp.Show", function (Show, CourseManager, Backbone, Marionette, $, _) {
	Show.MissingCourse = Marionette.ItemView.extend({
		template: "#missing-course-view"
	});
	
	Show.Course = Marionette.ItemView.extend({
		template: "#course-view",
	});
});