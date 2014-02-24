/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AdminloginView = Backbone.View.extend({
 
        id: 'admin-login',

        template: JST['app/scripts/templates/adminLogin.ejs'],

        render: function () {
            this.$el.html(this.template());
            return this;
        }


    });

    return AdminloginView;
});
