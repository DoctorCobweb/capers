/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AnalyseView = Backbone.View.extend({

        initialize: function () {
            console.log('initialize of AnalyseView');
            // console.log(this.options.filters);

            console.log('filters are:');
            _.each(this.options.filters.models, function (filter) {
                console.log(filter);
            });

        },

        id: 'analyse',

        template: JST['app/scripts/templates/analyse.ejs'],


        events: {
            'click #submit_for_analysis': 'analyse'


        },


        render: function () {
            this.$el.html(this.template());
            return this;
        },

        analyse: function () {
            console.log('in analyse function');

            // get the users text content we need to filter through
            var content = this.$('#analysis_content').val().trim();

            var content_split = content.split('\n');

            content_split = _.map(content_split, function (line) {
                return line.split(/\s+/);
            });

            // console.log(content_split); // nested array [[...], [...], [...]]

            // playing around
            /*
            var all_good_words = _.filter(_.flatten(content_split), function (term) {
                if (term === "bad") {
                    return false;
                } else {
                    return true;
                }
            });
            console.log(all_good_words);
            */


            // run through all the words and try to match each to a filter word
            for (var i = 0; i < content_split.length; i++) {
                for (var j = 0; j < content_split[i].length; j++) {

                    // for each word, compare against all filter words
                    content_split[i][j] = this.makeFilterMatches(content_split[i][j]);
                }
            }


            // append a newline character back into lines. needed for joining later
            for (var k = 0; k < content_split.length; k++) {
                content_split[k] = content_split[k].join(' ') + '\n';    
            }
            
            //console.log(_.flatten(content_split).join(' ')); // flattened arr -> str

            // show corrected content back to user
            this.$('#analysis_content').val(content_split.join(''));
        },



        makeFilterMatches: function (term) {
            var result = _.find(this.options.filters.models, function (filter) {
                if (filter.get('badTerm') === term) {
                    return true;
                } else {
                    return false;
                }
            });

            // return unchanged term if good, return corrected term if we found a filter
            if (result === void 0) {
                return term;
            } else {
                return result.get('goodTerm');
            }
        }



    });

    return AnalyseView;
});
