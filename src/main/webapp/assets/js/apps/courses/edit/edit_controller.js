CourseManager.module("CoursesApp.Edit", function(Edit, CourseManager, Backbone, Marionette, $, _) {
	Edit.Controller = {
		editCourse: function(courseCode) {
			var loadingView = new CourseManager.Common.Views.Loading({
				title: "Editing course " + courseCode,
				message: "please wait..."
			});
			CourseManager.coursesRegion.show(loadingView);
			
			var fetchingCourse = CourseManager.request("course:entity", courseCode);
			$.when(fetchingCourse).done(function(course) {
				var courseShowView;
				if (course !== undefined) {
					courseShowView = new Edit.Course({
						model: course,
						generateTitle: true
					});
					
					courseShowView.on("form:submit", function(data){
						if (course.save(data, {
							success: function(model, response) {
								console.log("OK!");
							},
							error: function(model, response) {
								console.log(response.responseText);
								courseShowView = new CourseManager.CoursesApp.Show.MissingCourse();
								CourseManager.coursesRegion.show(courseShowView);
							}
						})) {
							CourseManager.trigger("course:show", course.get("id"));
						}
						else {
							// triggerMethod will automatically execute a function whose name corresponds to the event
							// i.e. onFormDataInvalid
							courseShowView.triggerMethod("form:data:invalid", course.validationError);
						} // course.save
					}); // courseShowView.on
				}
				else {
					courseShowView = new Show.MissingCourse();
				}
				CourseManager.coursesRegion.show(courseShowView);
			});
		}
	}
});