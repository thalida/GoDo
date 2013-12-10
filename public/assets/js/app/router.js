var TodosModel;
define(function (require) {
	"use strict";
	
	Backbone.eventAggregator = _.extend({}, Backbone.Events);
	TodosModel = require('app/models/todos');

	var 
		CategoriesListView	=	require('app/views/todoCategoriesView'),
		categoriesCollection 	=	new TodosModel.CategoriesCollection(),
		listView 		=	new CategoriesListView({el: $('#menu'), model: categoriesCollection});
		
	return Backbone.Router.extend({
		routes: {
			"": "showFirstCategory",
			"list/:id": "showCategoryById",
		},

		defaultData: function(){
			categoriesCollection.fetch();
			if( categoriesCollection.length === 0 ){
				categoriesCollection.create({
					name: "Quick Guide",
					todos: [
						{ task: "create a todo list", index: 1},
						{ task: "add some todos", index: 2},
						{ task: "check off five items", index: 3},
						{ task: "share this website", index: 4}
					]
				});
			}
		},

		showFirstCategory: function () {
			this.defaultData();
			$('#menu select').val( $("#menu select option:first").val() );
			var val = $('#menu select').val();
			window.location.hash = 'list/' + val;
		},

		showCategoryById: function (id) {
			this.defaultData();
			require(['app/views/todosListView'], function (TodosView) {
				var model = TodosModel.Category.findOrCreate({ _id: id });
				model.fetch({
					success: function (todos) {
						var view = new TodosView({model: todos, el: $('body')});
						view.render();
					},
					error: function(){
						window.location.hash = ' ';
					}
				});
			});
		}
	});
});
