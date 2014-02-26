/*global define*/

define([
    'jquery',
    'backbone',
    '../views/home',
    '../views/adminLogin',
    '../views/contact',
    '../views/analyse',
    '../collections/filter'
], function ($, Backbone, HomeView, AdminLoginView, 
             ContactView, AnalyseView, FilterCollection) {
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
            var homeView = new HomeView();
            this.showView('.main-container', homeView);
        },

        analyse: function () {
            console.log('in analyse route handler');
            this.resetLinksAddActive('analyse');

            var filterCollection = new FilterCollection();

            //want to bind 'this' in options obj to router's 'this'. hence the IIFE
            filterCollection.fetch(
                (function (router) {
                    return {
                        error: function (c, r, o){
                            console.log('error in fetching filterCollection contents');
                        },
                        success: function (c, r, o){
                            console.log('success in fetching filterCollection contents');
                            console.dir(c);
                            console.dir(router); 
                            var analyseView = new AnalyseView({filters: c});
                            router.showView('.main-container', analyseView);
                        }
                    };
                })(this)
            );  


        },

        capered: function () {
            console.log('in capered route handler');


        },


        contact: function () {
            console.log('in contact');
            this.resetLinksAddActive('contact');
            var contactView = new ContactView();
            this.showView('.main-container', contactView);
 


        },


        adminLogin: function () {
            console.log('in admimLogin route handler');
            this.resetLinksAddActive('admin-login');
            var adminLoginView = new AdminLoginView();
            this.showView('.main-container', adminLoginView);
        },


// helper functions -------------------------------------------------------------

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
