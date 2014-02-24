/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone',
    'routes/router'
], function (Backbone, Router, Home) {

    $(function () {
        Backbone.View.prototype.close = function () {
            console.log('close view....');
            if (this.beforeClose) {
                this.beforeClose();
            }
    
            //remove view from DOM and call stopListening to remove bound 
            //events the view has listenTo'd
            this.remove();
            this.unbind();
        };
    
        Backbone.history.start();
        new Router();
    });
});
