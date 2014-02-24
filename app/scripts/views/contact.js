/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ContactView = Backbone.View.extend({

        id: 'contact',

        template: JST['app/scripts/templates/contact.ejs'],

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return ContactView;
});
