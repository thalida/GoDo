define(function(require){
	"use strict";
	var 	template	=	_.template(require('text!tpl/todoCategories.html'));

	require('dropit');

	return Backbone.View.extend({
		tagName: "form",
		
		initialize: function () {
			_.bindAll(this);
			
			this.listenTo(this.model, 'add', this.render);
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'reset', this.render);

			Backbone.eventAggregator.on('renderView', this.render);
		},

		render: function() {
			this.$el.html(template({categories: this.model.toJSON()}));
			$('.menu').dropit({align: 'right'});
			$('.selectpicker').selectpicker();
			return this;
		},
		
		events: {
			"change #categorySelectMenu"		:	"loadCategoryTodos" ,
			"click .btn-group.bootstrap-select"	:	"hideMenu"
		},

		loadCategoryTodos: function(event){
			var $target = $(event.target);
			window.location.hash = 'list/' + parseInt($target.val(), 10);
		},

		hideMenu: function(event){
			var $target = $(event.target);
			$('.menu.dropit').find('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
		}
	});
});
