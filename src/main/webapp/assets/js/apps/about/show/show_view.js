CourseManager.module("AboutApp.Show", function(Show, CourseManager, Backbone, Marionette, $, _) {
	Show.Message = Marionette.ItemView.extend({
		template: "#about-message"
	});
});