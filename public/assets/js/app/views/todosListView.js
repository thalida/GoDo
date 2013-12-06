define(function (require) {
	"use strict";
	var	
		todoListItemView	=	require('app/views/todoListItemView'),
		todoPlaceholder 	=	$('#createTodo').val();

	return Backbone.View.extend({
		initialize: function () {
			_.bindAll(this);

			this.listenTo(this.model, 'all', this.logEvent);

			//this.listenTo(this.model, 'add:todos', this.addOne);
			//this.listenTo(this.model, 'remove:todos', this.removeTodos);

			this.listenTo(this.model, 'relational:change:todos', this.changeTodos);
			this.listenTo(this.model, 'change:todos', this.render);
			Backbone.eventAggregator.on('removeTodo', this.removeTodo);
			//this.listenTo(this.model, 'remove:todos', this.render);

			//this.listenTo(this.model, 'relational:remove:todos', this.render);
			//this.listenTo(this.model, 'relational:change:todos', this.render);

			//this.listenTo(this.model, 'add', this.render);
			//this.listenTo(this.model, 'change', this.render);
			//this.listenTo(this.model, 'reset', this.render);
		},
		
		render: function (eventName) {
			console.log("RENDERING ("+ eventName +")  --->");
			this.todos = this.model.get( 'todos' );
			this.$list = $('#listTodos');
			this.$list.empty();
			this.addAll();

			console.log( this );
			console.log( this.model.get('todos') );
			console.log('<---');

			var 	allCount = this.todos.length,
				completedCount = this.todos.where({completed: true}).length;

			$('#statsTotal').html(allCount);
			$('#statsCompleted').html(completedCount);

			Backbone.eventAggregator.trigger('renderView', this.model);
			return this;
		},
		
		events: {
			"focus #createTodo" : "focusCreateInput",
			"blur #createTodo" : "blurCreateInput",
			"keyup #createTodo" : "submitCreateInput",
			"click #createWrapper span" : "submitByIcon",
			"click #allTab" : "filterShowAll",
			"click #completedTab" : "filterByCompleted",
			"click #activeTab" : "filterByActive"
		},
	
		addOne: function(todo) {
			var view = new todoListItemView({model: todo});
			this.$list.append(view.render().el);
		},
		
		addAll: function(){
			this.todos.each(this.addOne, this);
		},

		removeTodo: function(todo){
			this.model.get('todos').remove( todo );
			this.model.save();
		},
		
		focusCreateInput: function(event){
			var $target = $(event.target);
			if( $target.val() == todoPlaceholder ){
				$target.removeClass('placeholder').val('');
			}
		},

		blurCreateInput: function(event){
			var $target = $(event.target);
			if( $target.val() == todoPlaceholder || $target.val() == '' ){
				$target.addClass('placeholder').val(todoPlaceholder);
			}
		},

		submitCreateInput: function(event){
			var	newTask = $(event.target).val(),
				keycode = event.keyCode || event.which;
			if(keycode === 13 && newTask.length > 1 && newTask.length <= 20) {
				this.createTodo( newTask );
			}
		},

		submitByIcon: function(event){
			var newTask = $('#createTodo').val();
			if(newTask.length > 1 && newTask.length <= 20) {
				this.createTodo( newTask );
			}
		},

		createTodo: function( task ){
			var newTodo = new TodosModel.Todos({task: task, category: this.model, index: this.todos.length + 1});
			this.model.save();
			$('#createTodo').val('').focus();
		},

		logEvent: function( eventName ){
			console.log('<<<------------->>>');
			console.log('EVENT :: ALL => ' + eventName);
			console.log(eventName);
			console.log('-------------');
		}
	});
});
