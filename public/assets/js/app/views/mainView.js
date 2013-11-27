define(function (require) {
    "use strict";
    var $                   =	require('jquery'),
        _                   =	require('underscore'),
        Backbone            =	require('backbone'),

		todosModel          =	require('app/models/todos'),

		todoListView		=	require('app/views/todoListView'),

        wrapperTemplate 	=	_.template(require('text!tpl/wrapper.html'));

    return Backbone.View.extend({
    	initialize: function () {
    		this.todos = new todosModel.TodosCollection();
    		
    		this.listenTo(this.todos, 'add', this.addOne);
    		this.listenTo(this.todos, 'reset', this.addAll);
    		this.listenTo(this.todos, 'all', this.render);
    		
    		this.todos.fetch();
    	},
    	
    	render: function () {
           
           	return this;
        },
        
        events: {
        	"keyup #createTodo" : "createTodo"
        },

		addOne: function(todo) {
			var view = new todoListView({model: todo});
			$("#listTodos").append(view.render().el);
		},
		
		addAll: function(){
			this.todos.each(this.addOne, this);
		},
		
		createTodo: function(event){
			var newTask = $(event.target).val(),
				keycode = event.keyCode || event.which;
			if(keycode === 13 && newTask.length > 1 && newTask.length <= 20) {
				$(event.target).val('').blur();
				this.todos.create({task: newTask});
			}
		}
		
    });
});