define(function (require){
	"use strict"
	
	require('localstorage');

	var
		storage = new Backbone.LocalStorage("todoListStorage"),
		Todos = Backbone.RelationalModel.extend({
			idAttribute: '_id',
			defaults: {
				task: null,
				completed: false,
				index: 1
			},
			initialize: function() {
			},
			setStatus: function(){
				// GET COMPLETED STATUS AND TOGGLE IT
				var isCompleted = this.get('completed');
				this.set({completed: !isCompleted});
			}
		}),
		Category = Backbone.RelationalModel.extend({
			idAttribute: '_id',
			localStorage: storage,
			relations: [{
				type: Backbone.HasMany,
				key: 'todos',
				relatedModel: Todos,
				includeInJSON: Backbone.Model.prototype.idAttribute,
				reverseRelation: {
					key: 'category',
					includeInJSON: '_id'
				},
			}],
			defaults: {
				name: null
			},
			initalize: function() {},
			toJSON: function() {
				var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
				json.cid = this.cid;
				json.id = this.id;
				return json;
			},
			getTodos: function(){
				return this.get('todos').models;
			},
			getTodosCompleted: function() {
				return this.get( 'todos' ).where({completed: true});
			},
			getTodosNotCompleted: function() {
				return this.get( 'todos' ).where({completed: false});
			},
			autoIncrement: function() {
				if (!this.getTodos().length || this.getTodos().length === 0) return 1;
				var indexes = [];
				_.each(this.getTodos(), function(todo){ indexes.push(todo.get('index')); });
				return  _.max(indexes) + 1;
			},
			comparator: function(todo) {
				return todo.get('index');
			}
		}),
		CategoriesCollection = Backbone.Collection.extend({
			model: Category,
			localStorage: storage
		});
	
	return {
		Todos			:	Todos,
		Category		:	Category,
		CategoriesCollection	:	CategoriesCollection
	}
});
