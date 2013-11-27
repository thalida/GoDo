define(function(require){
	"use strict";
	var $                   =   require('jquery'),
	_                   =   require('underscore'),
	Backbone            =   require('backbone'),
	template        =   _.template(require('text!tpl/todoListItem.html'));

	return Backbone.View.extend({
		tagName: "li",
		
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},
		
		initalize: function(){
			this.temp
		},
		
		render: function() {
			this.$el.html(template(this.model.toJSON()));
			return this;
		},
		
		events: {
		        "blur .edit" : "saveEdit",
		        
			"click .status" : "setCompletedStatus",
			"click .close"  : "removeTask",
			
			"dblclick .title" : "editTask",
			
			"keyup .edit" : "saveOnEnter",
			
			"mouseover .title, .close" : "showClose",
			"mouseout .title, .close"  : "showClose",
		},
		
		editTask: function(event){
			var $target = $(event.target);
			$target.addClass('editMode').html('<input class="edit" type="text" value="' + $.trim($target.text()) + '" />');
			this.$('.edit').focus();
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
			}else{
				this.model.save({task: newTask});
			}
		},
		
		showClose: function(event){
			var $target = $(event.target),
			display = ( this.$('.close').css('display') == 'none' ) ? 'block' : 'none';
			this.$('.close').css({display: display});
		},
		
		setCompletedStatus: function(){
			this.model.setStatus();
		},
		
		removeTask: function(){
			this.model.destroy();
		}
	});
});
