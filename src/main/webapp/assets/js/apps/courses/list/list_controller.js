// Marionette will use an existing ContactsApp.List module if one exists, which it does in list_view.jsp
// so effectively, all the code here and in list_view.js is in the same ContactsApp.List module
CourseManager.module("CoursesApp.List", function(List, CourseManager, Backbone, Marionette, $, _) {
	List.Controller = {
		listCourses: function(criterion) {
			var loadingView = new CourseManager.Common.Views.Loading();
			CourseManager.coursesRegion.show(loadingView);

			var fetchingCourses = CourseManager.request("course:entities");
			
			var coursesListLayout = new List.Layout();
			var coursesListPanel = new List.Panel();
			
			$.when(fetchingCourses).done(function(courses){
				var filteredCourses = CourseManager.Entities.FilteredCollection({
					collection: courses,
					filterFunction: function(filterCriterion) {
						var criterion = filterCriterion.toLowerCase();
						return function(course) {
							if ((course.get("code").toLowerCase().indexOf(criterion) !== -1)  ||
							    (course.get("title").toLowerCase().indexOf(criterion) !== -1) ||
							    (course.get("description").toLowerCase().indexOf(criterion) !== -1)) {
								return course;
							}
						};
					}
				});
				
				if (criterion) {
					filteredCourses.filter(criterion);
					coursesListPanel.once("show", function(){
						coursesListPanel.triggerMethod("set:filter:criterion", criterion);
					});
				}
				
				var coursesView = new List.Courses({
					collection: filteredCourses
				});
				
				coursesListLayout.on("show", function(){
					coursesListLayout.panelRegion.show(coursesListPanel);
					coursesListLayout.coursesRegion.show(coursesView);
				});
				
				coursesView.on("itemview:course:show", function(childView, model) {
					CourseManager.trigger("course:show", model.get("id"));
				});
				
				coursesView.on("itemview:course:delete", function(childView, model) {
					courses.remove(model);
					// causes a DELETE request to the server with model.id
					model.destroy();
				});
				
				coursesView.on("itemview:course:edit", function(childView, model) {
					var view = new CourseManager.CoursesApp.Edit.Course({
						model: model
					});
					
					view.on("form:submit", function(data){
						if (model.save(data)) {
							childView.render();
							view.trigger("dialog:close");
							childView.flash("success");
						}
						else {
							view.triggerMethod("form:data:invalid", model.validationError);
						}
					});
					
					CourseManager.dialogRegion.show(view);
				});
				
				coursesListPanel.on("course:new", function(){
					var newCourse = new CourseManager.Entities.Course();
					
					var view = new CourseManager.CoursesApp.New.Course({
						model: newCourse
					});
					
					view.on("form:submit", function(data){
						// data doesn't contain and "id" attribute as we're coming from
						// the new course form. If it did contain an "id" attribute, PUT
						// would be called on the server instead of POST. This is no matter
						// what newCourse.isNew() says.
						if (newCourse.save(data, {
							success: function(model, response) {
								// model will have an id from the server
								// newCourse.set("id", model.get("id"));
								courses.add(model);
								view.trigger("dialog:close");
								var newCourseView = coursesView.children.findByModel(newCourse);
								// In case we create a course while there's a filter that doesn't match it
								// so it's not displayed
								if (newCourseView) {
									newCourseView.flash("success");
								}
							},
							error: function(model, response) {
								courseShowView = new CourseManager.CoursesApp.Show.MissingCourse();
								CourseManager.coursesRegion.show(courseShowView);
							}
						})) {
						}
						else {
							view.triggerMethod("form:data:invalid", newCourse.validationError);
						}
					});
					CourseManager.dialogRegion.show(view);
				});
				
				coursesListPanel.on("courses:filter", function(filterCriterion){
					filteredCourses.filter(filterCriterion);
					CourseManager.trigger("courses:filter", filterCriterion);
				});
				
				CourseManager.coursesRegion.show(coursesListLayout);
			});
		}
	}
});