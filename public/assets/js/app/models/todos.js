define(function (require){
	"use strict"
	
	var $					=	require('jquery'),
		_					= 	require('underscore'),
	    Backbone			= 	require('backbone');
	    
	Todo = Backbone.model.extend({
		defaults: {
			name: null,
			completed: false
		},
		
		initalize: function() {},
		
		completeStatus: function(){
			var isCompleted = this.get('completed');
			this.save({completed: !isCompleted});
		}
	}),
	
	TodosCollection = Backbone.collection.extend({
		model: Todo,
		localStorage: new Backbone.LocalStorage("SomeCollection")
	}),
	
	return {
		Todos			:	Todos,
		TodosCollection	:	TodosCollection
	}
});