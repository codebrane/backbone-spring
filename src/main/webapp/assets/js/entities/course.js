// Defines an Entities module on the ContactManager application
// params:
// the module itself (i.e.what name we’re going to use within the callback to refer to the module we’re defining)
// the application object the module was called from
// Backbone
// Backbone.Marionette
// JQuery
// Underscore
CourseManager.module("Entities", function(Entities, CourseManager, Backbone, Marionette, $, _) {
    Entities.Course = Backbone.Model.extend({
			urlRoot: "ws/course",
			
			// idAttribute: "code",
			
			defaults: {
				// id: null,
				code: "",
				title: "",
				description: ""
			},
			
			validate: function(attrs, options) {
				var errors = {};
				if (!attrs.title) {
					errors.title = "can't be blank";
				}
				if (!attrs.description) {
					errors.description = "can't be blank";
				}
				if (!_.isEmpty(errors)) {
					return errors;
				}
			}
    });

    Entities.CourseCollection = Backbone.Collection.extend({
		// By providing a url to our collection definition, we let Backbone step in with its magic and manage all the persistence for us
		// to create a new contact, Backbone will POST the json data to /contacts
		// to read the contact with id 3, Backbone will GET the json data from /contacts/3
		// to update the contact with id 3, Backbone will PUT the json data to /contacts/3
		// to delete the contact with id 3, Backbone will DELETE the json data to /contacts/3
		url: "ws/courses",
		model: Entities.Course,
		comparator: "title"
    });

	// private
	var API = {
		getCourseEntities: function() {
			var courses = new Entities.CourseCollection();
			var defer = $.Deferred();
			courses.fetch({
				success: function(data) {
					defer.resolve(data);
				},
				error: function(data) {
					defer.resolve(undefined);
				}
			});
			return defer.promise();
		},
		
		getCourseEntity: function(courseCode) {
			var course = new Entities.Course({id:courseCode})
			var defer = $.Deferred();
			course.fetch({
				success: function(data) {
					defer.resolve(data);
				},
				error: function(data) {
					defer.resolve(undefined);
				}
			});
			return defer.promise();
		}
	};
	
	CourseManager.reqres.setHandler("course:entities", function(){
		return API.getCourseEntities();
	});
	
	CourseManager.reqres.setHandler("course:entity", function(courseCode){
		return API.getCourseEntity(courseCode);
	});
	
});