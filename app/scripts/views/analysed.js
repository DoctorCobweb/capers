/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AnalysedView = Backbone.View.extend({

        initialize: function () {
            console.log('in analysed view');
            console.log(this.options.badWrapText);
            console.log(this.options.goodWrapText);
    
            this.locals = {
                badWrapText: this.options.badWrapText,
                goodWrapText: this.options.goodWrapText};

        },

        tagName: 'div',

        className: 'analysed-container row',

        render: function () {
            this.$el.html(this.template(this.locals));
            return this;
        },

        template: JST['app/scripts/templates/analysed.ejs']
    });

    return AnalysedView;
});
