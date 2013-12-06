define(function (require){
	"use strict"
	
	require('localstorage');

	var
		storage = new Backbone.LocalStorage(window.store || "todoStorage"),
		Todos = Backbone.RelationalModel.extend({
			idAttribute: '_id',
			localStorage: storage,
			defaults: {
				task: null,
				completed: false,
				index: 1
			},
			initalize: function() {},
		
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
