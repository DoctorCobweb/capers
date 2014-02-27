/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AnalysedsummarytermView = Backbone.View.extend({

        initialise: function () {
            console.log('in analysedSummaryTerm');
            console.log('this.options.term:');
            console.log(this.options.term);

        },

        className: 'analysed-summary-term',

        tagName: 'li',


        render: function () {
            this.$el.html(this.template(this.options.term));
            return this;

        },
 

        template: JST['app/scripts/templates/analysedSummaryTerm.ejs']
    });

    return AnalysedsummarytermView;
});
