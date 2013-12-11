define(function (require) {
	"use strict";

	var utils = {
		redirect: function(location){
			window.location.assign("http://todo.thalida.com/#" + location)
		},

		validate: function( obj ){
			var regex = {
				alphanumeric: {
					category: /^[\w\s]{1,20}$/,
					todo: /^[\w\s]{3,30}$/
				}
			};
			switch( obj.type ){
				case 'category':
					return regex.alphanumeric.category.test($.trim(obj.name));
					break;
				case 'todo':
					return regex.alphanumeric.todo.test($.trim(obj.task));
					break;
			}
			return false;
		}
	};

	return utils;
});