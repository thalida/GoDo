define(function (require) {
	"use strict";

	var utils = {
		validate: function( obj ){
			var regex = {
				alphanumeric: /^[\w\s]{3,30}$/
			};
			switch( obj.type ){
				case 'todo':
					return regex.alphanumeric.test($.trim(obj.task));
					break;
			}
			return false;
		}
	};

	return utils;
});