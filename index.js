/* jshint node: true */
'use strict';

var util = require('util');
var replace = require('broccoli-replace');
var Favicons = require('broccoli-favicon');
var mergeTrees = require('broccoli-merge-trees');

var htmlCache = null;

module.exports = {

  name: 'ember-cli-favicon',

  included: function(app) {
    this.options = app.options.favicons || {};
    this.options.htmlCallback = function(html) {
      htmlCache = html;
    };
  },

  postprocessTree: function(type, tree) {
    if (type === 'all') {
      var favicons = new Favicons(tree, this.options);
      tree = mergeTrees([ tree, favicons ]);
      return replace(tree, {
        files: [ 'index.html' ],
        patterns: [{
          match: /<\/head>/i,
          replacement: function() {
            return (htmlCache || []).join('\n') + '\n</head>';
          }
        }]
      });
    }
    return tree;
  }

};
