/*global define*/

define([
    'jquery',
    'backbone',
    '../views/home',
    '../views/adminLogin',
    '../views/contact',
    '../views/analyse',
    '../collections/filter',
    '../views/filterTerms',
    '../views/analysed'
], function ($, Backbone, HomeView, AdminLoginView, 
             ContactView, AnalyseView, FilterCollection, FilterTermsView,
             AnalysedView) {
    'use strict';

    var RouterRouter = Backbone.Router.extend({

        initialize: function () {
            console.log('in initialize of router.js');
            //this.navigate('home', {trigger: true});


            //Custom Backbone Events
            //Syntax for event: 'filename:thing-that-happened'
            //this event is triggered from analyse.js view when content text has
            //been filtered
            Backbone.on('analyse:analysed-text', 
                function (badWrapText, goodWrapText, foundBadTerms) {
                    console.log('BACKBONE:EVENT:analyse:analysed-text'); 
                    //console.log('badWrapText: ' + badWrapText); 
                    //console.log('goodWrapText: ' + goodWrapText); 
                    //console.log('foundBadTerms:');
                    //console.log(foundBadTerms); 
    
                    //call the capered route
                    this.navigate('capered');
                    this.capered(badWrapText, goodWrapText, foundBadTerms);

            }, this); //'this' is router instance
 
        },


        routes: {
            'home':           'home',
            'analyse':        'analyse',
            'filter-terms':   'filterTerms',
            'capered':        'capered',
            //'contact':        'contact',
            'admin-login':    'adminLogin'
        },



        home: function () {
            console.log('in home route handler');
            this.resetLinksAddActive('home-tab');
            var homeView = new HomeView();
            this.showView('.main-container', homeView);
        },

        analyse: function () {
            console.log('in analyse route handler');
            this.resetLinksAddActive('analyse-tab');

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

        
        filterTerms: function () {
            this.resetLinksAddActive('filter-terms-tab');
            console.log('in filterTerms route handler');
            var filterTermsView = new FilterTermsView();
            this.showView('.main-container', filterTermsView);
        },



        capered: function (badWrapText, goodWrapText, foundBadTerms) {
            console.log('in capered route handler');

            //console.log(badWrapText);
            //console.log(goodWrapText);
            //console.log(foundBadTerms);
            var analysedView = new AnalysedView({
                badWrapText: badWrapText, 
                goodWrapText: goodWrapText,
                foundBadTerms: foundBadTerms});

            this.showView('.main-container', analysedView);
           
        },


        contact: function () {
            console.log('in contact');
            this.resetLinksAddActive('contact-tab');
            var contactView = new ContactView();
            this.showView('.main-container', contactView);
        },


        adminLogin: function () {
            console.log('in admimLogin route handler');
            this.resetLinksAddActive('admin-login-tab');
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
