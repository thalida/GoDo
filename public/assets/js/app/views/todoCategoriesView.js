define(function(require){
	"use strict";
	var 	utils		=	require('utils'),
		template	=	_.template(require('text!tpl/todoCategories.html'));

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

		render: function( category ) {
			this.category = category || {id: 0, name:'null'};
			var templateAttributes = {
							categories: this.model.toJSON(), 
							chosenCategory: this.category.toJSON()
						     };
			this.$el.html( template( templateAttributes )); 
			$('.menu').dropit({align: 'right'});
			$('.selectpicker').selectpicker();

			return this;
		},
		
		events: {
			"change #categorySelectMenu"		:	"loadCategoryTodos" ,

			"click .btn-group.bootstrap-select"	:	"hideMenu",
			"click #submitCreateCategory"		: 	"createCategory",
			"click #submitChangeCategory"	: 	"editCategory",
			"click #categoriesDelete" 		: 	"deleteCategory",

			"show.bs.modal #categoriesCreateNew"	:	"focusCreateInput"
		},

		loadCategoryTodos: function(event){
			var $target = $(event.target);
			Backbone.eventAggregator.trigger('unbindView');
			utils.redirect('list/' + $target.val());
		},

		showCreateModal: function(event){
			$('#categoriesCreateNew').modal('show');
		},

		closeCreateModal: function(event){
			$('#closeCreateCategory').trigger('click');
			$('#categoriesCreateNew').modal('hide');
			$('body').removeClass('modal-open');
		},

		createCategory: function( event ){
			var	$target = $(event.target),
				categoryName = $.trim($('#categoriesCreateInput').val());
			if( utils.validate({type: 'category', name: categoryName}) === true ){
				this.closeCreateModal();
				$('#categoriesCreateNew').find('p.error').html('');
				var newCategory = this.model.create({name: categoryName});
				Backbone.eventAggregator.trigger('unbindView');
				utils.redirect('list/' + newCategory.id);
			}else{
				$('#categoriesCreateNew').find('p.error').html('Only 1-20 alphanumeric chars and spaces allowed');
			}
		},

		closeEditModal: function(event){
			$('#closeChangeCategory').trigger('click');
			$('#categoriesChangeName').modal('hide');
			$('body').removeClass('modal-open');
		},

		editCategory: function( event ){
			var	$target = $(event.target),
				categoryName = $.trim($('#categoriesChangeInput').val());
			if( utils.validate({type: 'category', name: categoryName}) === true ){
				$('#categoriesChangeName').find('p.error').html('');
				this.category.set({name: categoryName});
				this.category.save();
			}else{
				$('#categoriesChangeName').find('p.error').html('Only 1-20 alphanumeric chars and spaces allowed');
			}
		},

		deleteCategory: function(event){
			event.preventDefault();
			alert("Sorry, delete has not been implemented yet!");
		},

		focusCreateInput: function( event ){
			$('#categoriesCreateInput').focus();
		},

		hideMenu: function(event){
			var $target = $(event.target);
			$('.menu.dropit').find('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
		}
	});
});
