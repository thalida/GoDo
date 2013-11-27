define(function (require){
	"use strict"
	
	var     $			=	require('jquery'),
            _			= 	require('underscore'),
            Backbone	= 	require('backbone'),
	    
	        Todos = Backbone.Model.extend({
			    defaults: {
				    task: null,
				    completed: false
			    },
			
			    initalize: function() {},
			
			    setStatus: function(){
				    // GET COMPLETED STATUS AND TOGGLE IT
				    var isCompleted = this.get('completed');
				    this.save({completed: !isCompleted});
			    }
		    }),
	
		    TodosCollection = Backbone.Collection.extend({
			    model: Todos,
			    localStorage: new Backbone.LocalStorage("godoStorage")
		    });
	
	return {
	    Todos              :	Todos,
		TodosCollection    :	TodosCollection
	}
});
