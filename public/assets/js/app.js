//REQUIRE.JS CONFIG
require.config({
    baseUrl: 'public/assets/js/libs',
    paths: {
        app: '../app',
        tpl: '../app/templates',
                
		jquery: "http://code.jquery.com/jquery-latest",
		mediaqueries: 'css3-mediaqueries'
    },
    shim: {
    	'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {
	var router = new Router();
	Backbone.history.start();
});