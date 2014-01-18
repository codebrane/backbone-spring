CourseManager.module("CoursesApp.List", function(List, CourseManager, Backbone, Marionette, $, _) {
	// NoCoursesView not used outside this file so can be private
	var NoCoursesView = Marionette.ItemView.extend({
		template: "#course-list-none",
		tagName: "tr",
		className: "alert"
	});
	
	List.Layout = Marionette.Layout.extend({
		template: "#course-list-layout",
		
		regions: {
			panelRegion: "#panel-region",
			coursesRegion: "#courses-region"
		}
	});
	
	List.Panel = Marionette.ItemView.extend({
		template: "#course-list-panel",
		
		triggers: {
			"click button.js-new": "course:new"
		},
		
		events: {
			// react to the filter form being submitted and trigger an event
			"submit #filter-form": "filterContacts"
		},
		
		ui: {
			// name      jQuery selector
			criterion: "input.js-filter-criterion"
		},
		
		filterContacts: function(event) {
			event.preventDefault();
			var criterion = this.$(".js-filter-criterion").val();
			this.trigger("courses:filter", criterion);
		},
		
		// List.Controller::listCourses::coursesListPanel.triggerMethod("set:filter:criterion", criterion)
		onSetFilterCriterion: function(criterion) {
			this.ui.criterion.val(criterion);
		}
	});
	
	
	List.Course = Marionette.ItemView.extend({
		template: "#courses-template",
		tagName: "tr",
		
		// associates jQuery event listeners to handler functions
		events: {
			"click": "highlightName",
			// good practice:
			// prefix css class with js- to show it's not used for styling
			// only for javscript event handling
			"click button.js-delete": "deleteClicked",
			"click td a.js-show": "showClicked",
			"click td a.js-edit": "editClicked",
		},
		
		highlightName: function(eventObject) {
			// need to prevent the browser from navigating to the link’s location
			eventObject.preventDefault();
			// convert DOM element into jQuery object by wrapping in $()
			// el attribute references the rendered DOM element
			// within a view definition, using this.el will return the DOM element containing the view
			this.$el.toggleClass("warning");
		},
		
		deleteClicked: function(eventObject) {
			// stop the row being highlighted by highlightName
			eventObject.stopPropagation();
			// we're in an ItemView instance, which has a Backbone.Model containing one item
			// let the controller do the delete as views shouldn't change data
			// When an item view within a collection view triggers an event,
			// that event will bubble up through the parent collection view
			// with “itemview:” prepended to the event name
			this.trigger("course:delete", this.model);
		},
		
		showClicked: function(eventObject) {
			eventObject.preventDefault();
			eventObject.stopPropagation();
			this.trigger("course:show", this.model);
		},
		
		editClicked: function(event) {
			event.preventDefault();
			event.stopPropagation();
			this.trigger("course:edit", this.model);
		},
		
		// Marionette calls an item view’s remove method (if it’s defined) when the corresponding model is removed from the collection
		remove: function() {
			var self = this;
			this.$el.fadeOut(function(){
				// remove it from the DOM after the fade
				Marionette.ItemView.prototype.remove.call(self);
			});
		},
		
		flash: function(cssClass) {
			var $view = this.$el;
			$view.hide().toggleClass(cssClass).fadeIn(800, function(){
				setTimeout(function(){
					$view.toggleClass(cssClass);
				}, 500);
			});
		}
	});

    List.Courses = Marionette.CompositeView.extend({
		itemView: List.Course,
		itemViewContainer: "tbody",
		template: "#course-list",
		tagName: "table",
		className: "table table-hover",
		emptyView: NoCoursesView,
		
		// if collection is reset, need to append views.
		// onCompositeCollectionRendered has overriden to prepend
		// this restores appendHtml default behaviour
		initialize: function() {
			this.listenTo(this.collection, "reset", function(){
				this.appendHtml = function(collectionView, itemView, index) {
					collectionView.$el.append(itemView.el);
				}
			});
		},
		
		// override appendHtml after collection view has been displayed
		onCompositeCollectionRendered: function() {
			this.appendHtml = function(collectionView, itemView, index) {
				collectionView.$el.prepend(itemView.el);
			}
		},
		
		// When an event is triggered within a view, Marionette calls a corresponding method if it’s defined
		// itemview:contact:delete -> onItemviewCourseDelete
		onItemviewCourseDelete: function() {
			this.$el.fadeOut(1000, function() {
				$(this).fadeIn(1000);
			});
		}
    });
});