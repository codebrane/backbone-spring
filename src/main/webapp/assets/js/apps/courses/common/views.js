CourseManager.module("CoursesApp.Common.Views", function(Views, CourseManager, Backbone, Marionette, $, _) {
	Views.Form = Marionette.ItemView.extend({
		template: "#course-form",
		
		events: {
			"click button.js-submit": "submitClicked"
		},
		
		submitClicked: function(event) {
			event.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("form:submit", data);
		},
		
		onFormDataInvalid: function(errors) {
			var self = this;
			var $view = this.$el;
			
			var clearFormErrors = function(){
				var $form = $view.find("form");
				$form.find(".help-inline.error").each(function(){
					$(this).remove();
				});
				$form.find(".control-group.error").each(function(){
					$(this).removeClass("error");
				});
			}
			
			var markErrors = function(value, key) {
				var $controlGroup = self.$el.find("#course-" + key).parent();
				var $errorEl = $("<span>", {class: "help-inline error", text: value});
				$controlGroup.append($errorEl).addClass("error");
			}
			
			clearFormErrors();
			_.each(errors, markErrors);
		}
	});
});