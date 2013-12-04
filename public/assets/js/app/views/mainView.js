define(function (require) {
	"use strict";
	var	
		$		=	require('jquery'),
		_       		=	require('underscore'),
		Backbone	=	require('backbone'),
		todosModel	=	require('app/models/todos'),
		todoListView	=	require('app/views/todoListView'),
		wrapperTemplate	=	_.template(require('text!tpl/wrapper.html'));

	return Backbone.View.extend({
	    	initialize: function () {
	    		this.tab = 'all';
	    		this.todos = new todosModel.TodosCollection();
	    		
	    		this.listenTo(this.todos, 'add', this.addOne);
	    		this.listenTo(this.todos, 'reset', this.addAll);
	    		this.listenTo(this.todos, 'all', this.render);
	    		
	    		this.todos.fetch();
	    	},
	    	
	    	render: function () {
	    		var
	    			allCount = this.todos.length,
	    			activeCount = this.todos.where({completed: false}).length,
	    			completedCount = this.todos.where({completed: true}).length;
	    			
	    		$('#all-count').html('(' + allCount + ')');
	    		$('#active-count').html('(' + activeCount + ')');
	    		$('#completed-count').html('(' + completedCount + ')');
	    		
	    		if(this.tab == 'all') this.filterShowAll();
	    		else if(this.tab == 'active') this.filterByActive();
	    		else if(this.tab == 'completed') this.filterByCompleted();
	    		
	           	return this;
	        },
	        
	        events: {
	        	"keyup #createTodo" : "createTodo",
	        	"click #allTab" : "filterShowAll",
	        	"click #completedTab" : "filterByCompleted",
	        	"click #activeTab" : "filterByActive"
	        },
	
		addOne: function(todo) {
			var view = new todoListView({model: todo});
			$("#listTodos").append(view.render().el);
		},
		
		addAll: function(){
			this.todos.each(this.addOne, this);
		},
		
		createTodo: function(event){
			var 
				newTask = $(event.target).val(),
				keycode = event.keyCode || event.which;
			if(keycode === 13 && newTask.length > 1 && newTask.length <= 20) {
				this.todos.create({task: newTask});
				$(event.target).val('').focus();
			}
		},
		
		filterShowAll: function(){
			this.tab = 'all';
			$("#listTodos").empty();
			this.todos.each(this.addOne, this);
			this.setSelectedTab();
		},
		
		filterByActive: function(){
			this.tab = 'active';
			var collection = new todosModel.TodosCollection( this.todos.where({completed: false}) );
			$("#listTodos").empty();
			collection.each(this.addOne, this);
			this.setSelectedTab();
		},
		
		filterByCompleted: function(){
			this.tab = 'completed';
			var collection = new todosModel.TodosCollection( this.todos.where({completed: true}) );
			$("#listTodos").empty();
			collection.each(this.addOne, this);
			this.setSelectedTab();
		},
		
		setSelectedTab: function(){
			$('.tab').removeClass('selected');
			$('#' + this.tab + 'Tab').addClass('selected');
		}
		
	});
});
