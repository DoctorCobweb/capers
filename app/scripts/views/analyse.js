/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../views/analysed'
], function ($, _, Backbone, JST, AnalysedView) {
    'use strict';

    var AnalyseView = Backbone.View.extend({

        initialize: function () {
            console.log('initialize of AnalyseView');
            // console.log(this.options.filters);

            //console.log('filters are:');
            //_.each(this.options.filters.models, function (filter) {
            //    console.log(filter);
            //});

        },

        id: 'analyse-container',

        template: JST['app/scripts/templates/analyse.ejs'],


        events: {
            'click #submit-for-analysis': 'analyse'


        },


        render: function () {
            this.$el.html(this.template());
            return this;
        },

        analyse: function () {
            console.log('in analyse function');

            // these arrays of arrays will hold the filtered & wrapped words of text
            var filteredBadWrap,
                filteredGoodWrap;

            // get the users text content we need to filter through
            var content = this.$('#analysis-text').val().trim();

            content = content.split('\n');

            // results in content being a nested array [[...], [...], [...]]
            content = _.map(content, function (line) {
                return line.split(/\s+/);
            });


            //make deep copies of the content array of arrays, using jquery's 
            //extend function. need deep copy because it is an array of array
            filteredBadWrap  = $.extend(true, [], content),
            filteredGoodWrap = $.extend(true, [], content);
            

            // run through all the words and try to match each to a filter word
            for (var i = 0; i < content.length; i++) {
                for (var j = 0; j < content[i].length; j++) {

                    // for each word, compare against all filter words
                    filteredBadWrap[i][j]  = this.filterWrap(content[i][j]).badVersion;
                    filteredGoodWrap[i][j] = this.filterWrap(content[i][j]).goodVersion;
                }
            }

            // append a newline character back into lines. needed for joining later
            for (var k = 0; k < content.length; k++) {
                filteredBadWrap[k]  = filteredBadWrap[k].join(' ')  + '\n';    
                filteredGoodWrap[k] = filteredGoodWrap[k].join(' ') + '\n';    
            }
            
            this.analysedBadWrap =  filteredBadWrap.join('');
            this.analysedGoodWrap = filteredGoodWrap.join('');

            this.combinedWrap = this.analysedBadWrap + '\n\n' + this.analysedGoodWrap;

            // show corrected content back to user
            //this.$('#analysis-content').val(this.analysedBadWrap);
            this.$('#analysis-text').val(this.combinedWrap);

            console.log('BACKBONE:TRIGGER: triggering analyse:analysed-text event');
            Backbone.trigger('analyse:analysed-text', 
                this.analysedBadWrap,
                this.analysedGoodWrap);

        },


  
        //creates good and bad wrappers around terms. doing it so you dont have to loop
        //through the 2d content array again. trick is to return an object containing
        //the good and bad wrapped versions from the matching of all filters.
        filterWrap: function (term) {
            //console.log('in filterWrap function');
            //console.log(term);

            var generalWrap = {};

            var result = _.find(this.options.filters.models, function (filter) {
                if (filter.get('badTerm') === term) {
                    return true;
                } else {
                    return false;
                }
            });

            // return unchanged term if good, return corrected term if we found a filter
            if (result === void 0) {
                generalWrap.goodVersion = term;
                generalWrap.badVersion =  term;
                return generalWrap;

            } else {
                //wrap the word in something that css can use
                //id attr always contain the opposite version of text displayed so you
                //can easily lookup filter pairs in element.
                //TODO: change individual matches instead of whol doc correction. using
                //id attr<->text setup.
                //generalWrap.badVersion = '<span class="bad-term" id="'
                generalWrap.badVersion = '<span class="btn-danger" id="'
                    + result.get('goodTerm') + '">'
                    + term
                    + '</span>';

                //generalWrap.goodVersion = '<span class="good-term" id="'
                generalWrap.goodVersion = '<span class="btn-success" id="'
                    + result.get('badTerm') + '">'
                    + result.get('goodTerm') 
                    + '</span>';

                return generalWrap;
            }
        }



    });

    return AnalyseView;
});
