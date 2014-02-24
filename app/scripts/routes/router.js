/*global define*/

define([
    'jquery',
    'backbone',
    '../views/home',
    '../views/adminLogin',
    '../views/contact',
    '../views/analyse'
], function ($, Backbone, Home, AdminLogin, Contact, Analyse) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({

        initialize: function () {
            console.log('in initialize of router.js');
            this.navigate('home', {trigger: true});

 
        },


        routes: {
            'home':           'home',
            'analyse':        'analyse',
            'capered':        'capered',
            'contact':        'contact',
            'admin-login':    'adminLogin'
        },



        home: function () {
            console.log('in home route handler');
            this.resetLinksAddActive('home');
            var home = new Home();
            this.showView('.main-container', home);
        },

        analyse: function () {
            console.log('in analyse route handler');
            this.resetLinksAddActive('analyse');
            var analyse= new Analyse();
            this.showView('.main-container', analyse);


        },

        capered: function () {
            console.log('in capered route handler');


        },


        contact: function () {
            console.log('in contact');
            this.resetLinksAddActive('contact');
            var contact= new Contact();
            this.showView('.main-container', contact);
 


        },


        adminLogin: function () {
            console.log('in admin-login route handler');
            this.resetLinksAddActive('admin-login');
            var adminLogin = new AdminLogin();
            this.showView('.main-container', adminLogin);
        },


        resetLinksAddActive: function (element) {
            var links = $('ul.nav-pills > li');
            console.log('links:');
            console.dir(links);
            links.removeClass('active');
            $('#' + element).addClass('active');
        },


        showView: function (selector, view) {
            console.log('in showView() in router.js');
            if (this.currentView) {
                this.currentView.close();
            }
            $(selector).html(view.render().el);
            this.currentView = view;
            return view;
        }


    });

    return RouterRouter;
});
