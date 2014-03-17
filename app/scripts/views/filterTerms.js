/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
     '../views/filterItem',
     '../collections/filter'
], function ($, _, Backbone, JST, FilterItemView, FilterCollection) {
    'use strict';

    var FiltertermsView = Backbone.View.extend({

        initialize: function () {
            this.filterCount = 0;
            this.collection = new FilterCollection();
            this.listenTo(this.collection, 'add', this.addFilterItem);
            this.collection.fetch();
        },


        render: function () {
            this.$el.html(this.template());
            return this;
        },


        addFilterItem: function (filter) {
            var self = this;
            console.log('in addFilterItem');
            this.filterCount++;
            var view = new FilterItemView({model: filter, count: self.filterCount});
            this.$('.table > tbody').append(view.render().el);
        },


        template: JST['app/scripts/templates/filterTerms.ejs']
    });
    return FiltertermsView;
});
