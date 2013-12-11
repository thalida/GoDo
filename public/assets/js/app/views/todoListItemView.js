define(function(require){
	"use strict";
	var 	utils		=	require('utils'),
		template	=	_.template(require('text!tpl/todoListItem.html')),
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
			"click .edit-btn" : "showHideEditTodo",
			"click .deleteTodo" : "removeTodo",
			"click .saveTodo" : "saveEdit",
			
			"keyup .edit-title" : "validateTodo"
		},

		showHideEditTodo: function( event ){
			var	that = this,
				hideOtherAccordions = !( this.$accordion.is(":visible") );
			that.$('.edit').val( this.model.get('task') );
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
				that.$title.show();
			}});
		},

		validateTodo: function(event){
			var	newTask = $.trim(this.$('.edit').val()),
				keycode = event.keyCode || event.which,
				isValid = utils.validate({type: 'todo', task: newTask});

			if( isValid ){
				this.clearEditInputError();
			}else{
				this.$('.edit').addClass('error').siblings('.error-output').html('Only 3-30 alphanumeric chars and spaces allowed');
			}

			if(keycode === 13 && this.model.get('task') !== newTask && isValid) {
				//this.model.set({task: newTask});
			}
		},

		clearEditInputError: function(){
			this.$('.edit').removeClass('error').siblings('.error-output').html('');
		},
		
		saveEdit: function(event){
			event.preventDefault();
			var newTask = $.trim(this.$('.edit').val());
			this.$('.title').removeClass('editMode');
			if( this.model.get('task') !== newTask && utils.validate({type: 'todo', task: newTask}) ){
				this.clearEditInputError();
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
			var isConfirmed = confirm('Are you sure you want to remove "' + this.model.get('task') + '"?');
			if( isConfirmed ){
				this.category.get('todos').remove(this.model);
				this.category.save();
			}
		}
	});
});
