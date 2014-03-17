/*global define*/ 
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    './analysedSummary'
], function ($, _, Backbone, JST, AnalysedSummaryView) {
    'use strict';

    var AnalysedView = Backbone.View.extend({

        initialize: function () {
            console.log('in analysed view');
            //console.log(this.options.badWrapText);
            //console.log(this.options.goodWrapText);
            //console.log(this.options.foundBadTerms);

            // get the passed in text from creation, use to set template variables    
            this.locals = {
                badWrapText:  this.options.badWrapText,
                goodWrapText: this.options.goodWrapText};
        },


        events: {
            'click .a-term':          'toggle',
            'click #toggle-all' :     'toggleAll',
            'click #finalize-copy':   'finalizeCopy'
        },


        tagName: 'div',


        className: 'analysed-container row',


        render: function () {
            this.$el.html(this.template(this.locals));

            //create the analysed summary view to display on the righthand side
            this.analysedSummaryView = new AnalysedSummaryView(
                {foundBadTerms: this.options.foundBadTerms,
                 parent: this});

            this.$('.analysed-summary').append(this.analysedSummaryView.render().el);

            return this;
        },


        template: JST['app/scripts/templates/analysed.ejs'],


        toggle: function (e) {
            console.log('in toggle');
 
            var $target = this.$('#' + e.target.id);
            var _oppositeTerm = $target.html();

            //console.log(e);
            //console.log(e.target.id);
            //console.log($target);
            console.log('$target.data("opposite-term"):' + $target.data('opposite-term'));
            console.log('_oppositeTerm: ' + _oppositeTerm);

            // set the text to be the opposite term
            $target.html($target.data('opposite-term'));
            $target.data('opposite-term', _oppositeTerm);


            // toggle the class to the opposite type btn-danger <-> btn-success 
            if ($target.attr('class') === 'btn-danger a-term') {
                $target.attr('class', 'btn-success a-term');

            } else if ($target.attr('class') === 'btn-success a-term') {
                $target.attr('class', 'btn-danger a-term');

            } else {
                console.log('error: could not toggle class');
            }
        },

 
        toggleAll: function () {
            console.log('in toggleAll');
  
            var allSpans = this.$('.analysed-text  span');
            var spanClass = allSpans.attr('class'); 
            //console.log(allSpans);
            //console.log(spanClass);
 
            if (spanClass === 'btn-danger a-term') {
                allSpans.attr('class', 'btn-success a-term');

            }  else if (spanClass === 'btn-success a-term') {
                allSpans.attr('class', 'btn-danger a-term');
            } else {
                console.log('error: could not toggle all classes');
            }

            var individuals = function (span) {
                //console.log(this);
                //console.log(span);
                //console.log(span.id);

                var $span = this.$('#' + span.id);
                var _oppositeTerm = $span.html();
                //var _oppositeTerm = $span.data('opposite-term');

                //console.log($span);

                $span.html($span.data('opposite-term'));
                $span.data('opposite-term', _oppositeTerm);
                return; 
            };

            // this === analysedView instance
            var bound_individuals = _.bind(individuals, this);
            _.each(allSpans, bound_individuals);
        },


        finalizeCopy: function () {
            var $a = $('.actual-analysed-text');
            //need to parse out all the html elements <span>, <br>, (TODO: and possibly
            //others!!!)

            this.stripAwayHighlighting($a); 
            var copiedText = this.copyText($a); 
            console.log(copiedText);

	    //this does not preserve newlines.
	    //prompt the user to copy the formatted text
	    //window.prompt('Copy to clipboard, Ctrl/Cmmd-C, Enter', copiedText);
        },


        stripAwayHighlighting: function ($a) {
            var $item;
            var s = _.map($a.contents(), function (item) { 
                $item = $('#'+ item.id);
                $item.replaceWith($item.html())
            });
            //console.log(s); //results in an array of undefined's. ???? why?
        },


        copyText: function ($aClone) {
            //create an array now to parse html, then join it back up to make a parsed
            //string for easy copying & pasting.
            var tempA = []; 

            _.each($aClone.contents(), function (item) { 
                if (item.nodeName === 'BR') {
                    //console.log('BR');
                    //item.outerHTML = '\n';
                    tempA.push('\n');
                } else if (item.nodeName === '#text') {
                    tempA.push(item.textContent.trim());
                } else {
                    tempA.push('ERROR parsing. See copyText() in analysed.js');
                }
            });

            //console.dir(tempA);

            var p = '';
            for (var i = 0; i < tempA.length - 1; ) {
                //console.log('BEGIN LOOP ITERATION')
                //console.log('tempA[i]: ' + tempA[i]);
                //console.log('tempA[i+1]: ' + tempA[i+1]);

                if (tempA[i] === '\n' && tempA[i + 1] !== '\n') {
                    // e.g. [..., \n, hello, ...]

                    //console.log('(\\n, NOT \\n)');
                    p = p + tempA[i] + tempA[i + 1] + ' ';
                    i = i + 2;

                } else if (tempA[i] === '\n' && tempA[i + 1] === '\n') {
                    //e.g. [..., \n, \n, ...]
   
                    //console.log('(\\n, \\n)');
                    p = p + tempA[i] + tempA[i + 1];
                    i = i + 2;

                } else if (tempA[i] !== '\n' && tempA[i + 1] !== '\n') {
                    //e.g. [..., helo, world, ...]     

                    //console.log('(NOT \\n, NOT \\n)');
                    p = p + tempA[i] + ' ' + tempA[i + 1] + ' ';
                    i = i + 2;

                } else if (tempA[i] !== '\n' && tempA[i + 1] === '\n') {
                    //e.g. [..., hello, \n, ...]

                    //console.log('(NOT \\n, \\n)');
                    //must trim ending whitespace if there is any. otherwise u can get
                    //doublespace.
                    p = p.trim() + tempA[i] + tempA[i + 1];
                    i = i + 2;

                } else {
                    //e.g. ?

                    //console.log('NO MATCH for tempA[i]: ' + tempA[i]);
                    i++;
                }
            }


            return p;
        },


        beforeClose: function () {
            // when router calls this view to close, make sure you also close the 
            // analysedSummary view instance!
            
            console.log('in beforeClose() in analysed.js');
            if (this.analysedSummaryView) {
                this.analysedSummaryView.close();
            }
        }

    });

    return AnalysedView;
});
