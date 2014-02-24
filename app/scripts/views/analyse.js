/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AnalyseView = Backbone.View.extend({

        id: 'analyse',

        template: JST['app/scripts/templates/analyse.ejs'],

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return AnalyseView;
});
