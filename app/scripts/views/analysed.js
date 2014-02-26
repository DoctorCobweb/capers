/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AnalysedView = Backbone.View.extend({

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        template: JST['app/scripts/templates/analysed.ejs']
    });

    return AnalysedView;
});
