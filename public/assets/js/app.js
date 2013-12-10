//REQUIRE.JS CONFIG
require.config({
	baseUrl: 'public/assets/js/libs',
	paths: {
		app: '../app',
		tpl: '../app/templates',
				
		jquery: "http://code.jquery.com/jquery-latest",
		jqueryui: "http://code.jquery.com/ui/1.10.3/jquery-ui.min",
		mediaqueries: 'css3-mediaqueries',
		localstorage: "backbone.localstorage",
		bootstrap: '/public/assets/bootstrap/js/bootstrap.min',
		bootstrapSelect: '/public/assets/bootstrap/js/bootstrap-select.min',
	},
	shim: {
		'bootstrap': ['jquery'],
		'dropit': ['jquery'],
		'jqueryui': ['jquery'],
		'bootstrapSelect': ['bootstrap'],
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'backbone-relational': {
			deps: ['backbone', 'localstorage'],
			exports: 'Backbone'
		},
		'app/models/todos': ['backbone-relational','localstorage'],
		'app/router': ['jqueryui', 'bootstrapSelect', 'localstorage', 'app/models/todos','dropit']
	}
});

require(['jquery', 'backbone', 'app/router', 'backbone-relational'], function ($, Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});
