define(function (require) {
	"use strict";
	var	utils			=	require('utils'),
		todoListItemView	=	require('app/views/todoListItemView'),
		todoPlaceholder 	=	$('#createTodo').val();

	return Backbone.View.extend({
		initialize: function () {
			_.bindAll(this);

			this.listenTo(this.model, 'add:todos', this.addOne);
			this.listenTo(this.model, 'change:todos', this.render);
			this.listenTo(this.model, 'remove:todos', this.removeTodo);

			this.listenTo(this.model, 'add', this.render);
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'reset', this.render);
		},
		
		render: function (eventName) {
			this.todos = this.model.get( 'todos' );
			this.$list = $('#listTodos');
			this.$list.empty();

			this.addAll();

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
				this.clearCreateInputError();
			}
		},

		clearCreateInputError: function(){
			$('#createTodo').removeClass('error').siblings('.error-output').html('');
		},

		submitCreateInput: function(event){
			var	newTask = $(event.target).val(),
				keycode = event.keyCode || event.which,
				isValid = utils.validate({type: 'todo', task: newTask});
			if( isValid ){
				this.clearCreateInputError();
			}else{
				$(event.target).addClass('error').siblings('.error-output').html('Only 3-30 alphanumeric chars and spaces allowed');
			}
			if(keycode === 13 && isValid) {
				this.clearCreateInputError();
				this.createTodo( newTask );
			}
		},

		createTodo: function( task ){
			if( utils.validate({type: 'todo', task: task}) === true ){
				var	index = this.model.autoIncrement(),
					newTodo = new TodosModel.Todos({task: $.trim(task), category: this.model, index: index});
				this.model.save();
				$('#createTodo').val('').focus();
			}
		},

		removeTodo: function( todo ){
			todo.destroy();
			if( this.model.get('todos').length === 0 ) 
				this.render();
		}
	});
});
