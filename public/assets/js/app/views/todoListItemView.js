define(function(require){
	"use strict";
	var 	template	=	_.template(require('text!tpl/todoListItem.html')),
		el = {};

	return Backbone.View.extend({
		tagName: "li",
		
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		
		render: function() {
			this.category = this.model.get('category');
			this.model.set({'categories': this.category.collection.models});
			this.$el.html(template(this.model.toJSON()));
			this.$accordion = this.$('.accordion-form');
			this.$title = this.$('.title');

			$('.selectpicker').selectpicker();

			return this;
		},
		
		events: {
			"click .status" : "setCompletedStatus",
			"click .title" : "setCompletedStatus", 
			"click .edit-btn" : "editTodo",
			"click .deleteTodo" : "removeTodo",
			
			"keyup .edit-title" : "saveOnEnter"
		},

		editTodo: function( event ){
			var	that = this,
				hideOtherAccordions = !( this.$accordion.is(":visible") );
			if( hideOtherAccordions == true ){
				$('.accordion-form').slideUp();
				$('.title').show();
				that.showAccordion();
			}else{
				that.hideAccordion();
			}
		},

		showAccordion: function(){
			var that = this;
			this.$accordion.slideDown({duration: 500, complete: function(){
				that.$title.hide();
				that.$accordion.find('.edit-title').focus();
			}});
		},

		hideAccordion: function(){
			var that = this;
			this.$accordion.slideUp({duration: 500, complete: function(){
				that.model.get('category').save();
				that.$title.show();
			}});
		},

		saveOnEnter: function(event){
		        var keycode = event.keyCode || event.which;
		        if(keycode === 13){
		        	this.saveEdit();
		        }
		},
		
		saveEdit: function(event){
			var newTask = this.$('.edit').val();
			this.$('.title').removeClass('editMode');
			if(newTask == '' || newTask == null){
				this.removeTask();
			}else if( $.trim(this.model.get('task')) != $.trim(newTask) ){ // ONLY SAVE IF A NEW TASK WAS ENTERED
				this.model.set({task: newTask});
				this.category.save();
			}
		},
		
		setCompletedStatus: function(){
			var completed = this.model.get('completed');
			this.model.set({ 'completed': !completed });
			this.category.save();
		},

		removeTodo: function( event ){
			event.preventDefault();
			this.category.get('todos').remove(this.model);
		}
	});
});
