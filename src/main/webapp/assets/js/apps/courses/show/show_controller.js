CourseManager.module("CoursesApp.Show", function(Show, CourseManager, Backbone, Marionette, $, _) {
	Show.Controller = {		
		showCourse: function(courseCode) {
			var loadingView = new CourseManager.Common.Views.Loading({
				title: "Loading course " + courseCode,
				message: "please wait..."
			});
			CourseManager.coursesRegion.show(loadingView);
			
			var fetchingCourse = CourseManager.request("course:entity", courseCode);
			$.when(fetchingCourse).done(function(course) {
				var courseShowView;
				if (course !== undefined) {
					courseShowView = new Show.Course({
						model: course
					});
				}
				else {
					courseShowView = new Show.MissingCourse();
				}
				CourseManager.coursesRegion.show(courseShowView);
			});
		}
	}
});