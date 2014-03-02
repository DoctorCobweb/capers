/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    './analysedSummaryTerm'
], function ($, _, Backbone, JST, AnalysedSummaryTerm) {
    'use strict';

    var AnalysedsummaryView = Backbone.View.extend({


        initialize: function () {
            console.log('in analysedSummary');
            console.dir(this.options.foundBadTerms);
            console.log('parent of analysedSummaryView instance is:');
            console.log(this.options.parent);
        },


        className: 'analysed-summary-ul',


        tagName: 'ul',


        render: function () {
            this.$el.html(this.template()); //an empty template

            //this is what we're really after. render each matched bad term in its own
            //<li> element.
            this.renderMatchedTerms();
            return this;
        },


        template: JST['app/scripts/templates/analysedSummary.ejs'],


        renderMatchedTerms: function () {
            var self = this;

	    if (_.isEmpty(this.options.foundBadTerms)){
                console.log('this.options.foundBadTerms is empty');
		console.log(this.options.foundBadTerms);
		
		this.options.foundBadTerms = {
	            "No Matches": {
	                "badTerm": "No bad terms found. You\'re good to go.",
	                "goodTerm": "",
	                "description": ""
		    }	
		};
	    }

            _.each(this.options.foundBadTerms, function (term) {

               var aTerm = new AnalysedSummaryTerm({term: term});
               self.$el.append(aTerm.render().el);
            });
        },


        beforeClose: function () {
            console.log('in beforeClose() in analysedSummary');
        }
    });
    return AnalysedsummaryView;
});
