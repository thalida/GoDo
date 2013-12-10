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
		spectrum: 'spectrum',
	},
	shim: {
		'bootstrap': ['jquery'],
		'dropit': ['jquery'],
		'jqueryui': ['jquery'],
		'spectrum':['jquery'],
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

require(['jquery', 'backbone', 'app/router', 'jqueryui', 'backbone-relational', 'spectrum'], function ($, Backbone, Router) {
	$("#colorPicker").spectrum({
		allowEmpty: false,
		cancelText: 'cancel',
		chooseText: 'Save',
		clickoutFiresChange: false,
		color: '#eb5141',
		disabled: false,
		flat: false,
		localStorageKey: 'todoListColor',
		maxSelectionSize: 3,
		palette: [['#eb5141', '#1abc9c', '#913D88'],['#3498db','#3A539B','#34495e']],
		preferredFormat: 'hex6',
		showAlpha: false,
    		showButtons: true,
		showInitial: true,
		showInput: true,
		showPalette: true,
		showPaletteOnly: false,
		showSelectionPalette: true,

		change: function( color ){
			$('#container').animate({'backgroundColor': color.toHexString()}, {duration: 500, queue: false});
			//$('#container').css({'backgroundColor': color.toHexString()});
			localStorage.setItem('todoListColorSelected',color.toHexString());
		},
		hide: function( color ){
			$('#container').animate({'backgroundColor': color.toHexString()}, {duration: 500, queue: false});
			//$('#container').css({'backgroundColor': color.toHexString()});
		},
		move: function( color ){
			$('#container').animate({'backgroundColor': color.toHexString()}, {duration: 500, queue: false});
			//$('#container').css({'backgroundColor': color.toHexString()});
		}
	});

	var savedColor = localStorage.getItem('todoListColorSelected') || '#eb5141';
	$('#container').animate({'backgroundColor': savedColor}, {duration: 1000, queue: false});
	$("#colorPicker").spectrum("set", savedColor);

	var router = new Router();
	Backbone.history.start();
});
