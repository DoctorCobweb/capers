/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var DocinputView = Backbone.View.extend({
        template: JST['app/scripts/templates/docInput.ejs']
    });

    return DocinputView;
});
