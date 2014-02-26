/*global define*/

define([
    'underscore',
    'backbone',
    'models/filter'
], function (_, Backbone, FilterModel) {
    'use strict';

    var FilterCollection = Backbone.Collection.extend({


        model: FilterModel,

        url: '/filters'



    });

    return FilterCollection;
});
