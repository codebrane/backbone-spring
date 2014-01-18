CourseManager.module("CoursesApp.New", function(New, CourseManager, Backbone, Marionette, $, _) {
	New.Course = CourseManager.CoursesApp.Common.Views.Form.extend({
		title: "New Course",
		
		onRender: function() {
			// this.$(...) selects a DOM element
			// provided by Backbone for this.$el.find(...)
			this.$(".js-submit").text("Create Course");
		}
	});
});