/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FilteritemView = Backbone.View.extend({

        tagName: 'tr',

        initialize: function () {

            // a hack to get a count variable into the template. used for # col in table
            this.model.attributes.element_count = this.options.count;

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },


        template: JST['app/scripts/templates/filterItem.ejs']
    });

    return FilteritemView;
});
