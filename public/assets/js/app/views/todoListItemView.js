define(function(require){
	"use strict";
	var 	template	=	_.template(require('text!tpl/todoListItem.html'));

	return Backbone.View.extend({
		tagName: "li",
		
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},
		
		render: function() {
			this.category = this.model.get('category');
			this.model.jsonData = this.model.toJSON();
			this.$el.html(template(this.model.toJSON()));
			return this;
		},
		
		events: {
			//"blur .edit-title" : "saveEdit",
		        
			"click .status" : "setCompletedStatus",
			"click .title" : "setCompletedStatus", 
			"click .edit-btn" : "editTodo",
			"click deleteTodo" : "remove",
			
			"keyup .edit-title" : "saveOnEnter"
		},

		editTodo: function( event ){
			var	that = this,
				index = this.model.get('index'),
				$accordion = that.$('.accordion-form');
			$accordion.slideToggle({duration: 500, complete: function(){
				var isVisible = $accordion.is(":visible");
				var $title = that.$('.title');
				if( isVisible ){
					$title.hide();
					$accordion.find('.edit-title').focus();
				}else{
					that.model.get('category').save();
					$title.show();
				}
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

		remove: function(){
			Backbone.eventAggregator.trigger('removeTodo', this.model);
			this.model.destroy();
			//this.category.save();
		}
	});
});
