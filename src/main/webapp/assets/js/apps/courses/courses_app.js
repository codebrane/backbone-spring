CourseManager.module("CoursesApp", function(CoursesApp, CourseManager, Backbone, Marionette, $, _) {
	CoursesApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			// stuff in (...) is optional
			"courses(/filter/criterion::criterion)": "listCourses",
			"courses/:id": "showCourse",
			"courses/:id/edit": "editCourse"
		}
	});
	
	var API = {
		listCourses: function(criterion) {
			CourseManager.CoursesApp.List.Controller.listCourses(criterion);
			CourseManager.execute("set:active:header", "courses");
		},
		
		showCourse: function(id) {
			CoursesApp.Show.Controller.showCourse(id);
			CourseManager.execute("set:active:header", "courses");
		},
		
		editCourse: function(id) {
			CoursesApp.Edit.Controller.editCourse(id);
			CourseManager.execute("set:active:header", "courses");
		}
	};
	
	CourseManager.on("courses:list", function() {
		CourseManager.navigate("courses");
		API.listCourses();
	});
	
	CourseManager.on("course:show", function(id){
		CourseManager.navigate("courses/" + id);
		API.showCourse(id);
	});
	
	CourseManager.on("course:edit", function(id){
		CourseManager.navigate("courses/" + id + "/edit");
		API.editCourse(id);
	});
	
	CourseManager.on("courses:filter", function(criterion){
		if (criterion) {
			CourseManager.navigate("courses/filter/criterion:" + criterion);
		}
		else {
			CourseManager.navigate("courses");
		}
	});
	
	CourseManager.addInitializer(function() {
		new CoursesApp.Router({
			controller: API
		});
	});
});