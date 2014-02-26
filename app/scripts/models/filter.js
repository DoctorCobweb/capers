/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var FilterModel = Backbone.Model.extend({

        defaults: {

        },

        idAttribute: "_id"



    });

    return FilterModel;
});
