/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HomeView = Backbone.View.extend({
        initialize: function () {
            console.log('in home view');
	    this.render();
        },


        template: JST['app/scripts/templates/home.ejs'],


        el: '.main-container',


        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });
    return HomeView;
});
