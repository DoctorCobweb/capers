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

        id: 'analyse',

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

            var filteredBadWrap,
                filteredGoodWrap;

            // get the users text content we need to filter through
            var content = this.$('#analysis-content').val().trim();

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
                    filteredBadWrap[i][j]  = this.filterWrap(content[i][j]).goodVersion;
                    filteredGoodWrap[i][j] = this.filterWrap(content[i][j]).badVersion;
                }
            }

            // append a newline character back into lines. needed for joining later
            for (var k = 0; k < filteredBadWrap.length; k++) {
                filteredBadWrap[k] = filteredBadWrap[k].join(' ') + '\n';    
            }
            
            this.analysedBadWrap = filteredBadWrap.join('');

            // show corrected content back to user
            this.$('#analysis-content').val(this.analysedBadWrap);
            //this.$('#analysis_content').html(content_split.join(''));

            var analysedView = new AnalysedView();
            this.$('#analyse-content').append(analysedView.render().el);

        },


  
        //creates good and bad wrappers around terms. doing it so you dont have to loop
        //through the 2d content array again. trick is to return an object containing
        //the good and bad wrapped versions from the matching of all filters.
        filterWrap: function (term) {
            console.log('in filterWrap function');
            console.log(term);

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
                generalWrap.badVersion = '<span class="bad-term" id="'
                    + result.get('badTerm') + '">'
                    + term
                    + '</span>';

                generalWrap.goodVersion = '<span class="good-term" id="'
                    + result.get('goodTerm') + '">'
                    + term
                    + '</span>';

                return generalWrap;
            }
        }



    });

    return AnalyseView;
});
