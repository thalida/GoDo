define(function (require) {
    "use strict";
    var $                   =	require('jquery'),
        _                   =	require('underscore'),
        Backbone            =	require('backbone'),

        wrapperTemplate = _.template(require('text!tpl/wrapper.html'));

    return Backbone.View.extend({
    	render: function () {
            this.$el.html(wrapperTemplate());
            return this;
        },

        events: {
        	
        }
    });
});