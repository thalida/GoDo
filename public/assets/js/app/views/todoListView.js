define(function(require){
    "use strict";
    var $                   =	require('jquery'),
        _                   =	require('underscore'),
        Backbone            =	require('backbone'),
        template			=	_.template(require('text!tpl/todoListItem.html'));

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
	    	"click .status"	:	"setCompletedStatus",
	    	"click .close"	:	"removeTask",
	    	
	    	"mouseover .title, .close"	:	"showClose",
	    	"mouseout .title, .close"	:	"showClose",
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