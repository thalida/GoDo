//REQUIRE.JS CONFIG
require.config({
	baseUrl: 'public/assets/js/libs',
	paths: {
        	app: '../app',
        	tpl: '../app/templates',
                
		jquery: "http://code.jquery.com/jquery-latest",
		mediaqueries: 'css3-mediaqueries',
		localstorage: "backbone.localstorage.min"
    	},
    	shim: {
    		
    		'backbone': {
            		deps: ['underscore', 'jquery'],
            		exports: 'Backbone'
        	},
        	'underscore': {
            		exports: '_'
        	},
        	'localstorage':{
        		deps: ['backbone']
        	},
        	'app/views/mainView':{
        		deps: ['localstorage'] // Makes sure these two (and their deps) load before the app/views/loads
        	}
        }
});

require(['jquery', 'backbone', 'app/views/mainView'], function ($, Backbone, GoDoView) {
	new GoDoView({el: $('body')}).render();
});
