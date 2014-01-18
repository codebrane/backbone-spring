CourseManager.module("CoursesApp.Edit", function(Edit, CourseManager, Backbone, Marionette, $, _) {
	Edit.Course = CourseManager.CoursesApp.Common.Views.Form.extend({
		initialize: function() {
			this.title = "Edit " + this.model.get("id");
		},
		
		onRender: function() {
			if (this.options.generateTitle) {
				var $title = $("<h1>", {text: this.title});
				this.$el.prepend($title);
			}
			this.$("#course-code").attr("disabled", "disabled");
			this.$(".js-submit").text("Edit Course");
		}
	});
});