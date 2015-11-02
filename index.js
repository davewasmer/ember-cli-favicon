/* jshint node: true */
'use strict';

var util = require('util');
var replace = require('broccoli-replace');
var favicons = require('broccoli-favicon');

var htmlCache = null;

module.exports = {

  name: 'ember-cli-favicon',

  included: function(app) {
    this.options = app.favicons || {};
    this.options.callback = function(result) {
      if (typeof result === 'string') {
        if (result.match(/^\d{3}/)) {
          throw new Error('Error generating favicons (is your source file square?): ' + result);
        }
        htmlCache = result;
      } else {
        if (result.favicon_generation_result.result.status === 'error') {
          throw new Error(result.favicon_generation_result.result.error_message);
        } else {
          throw new Error('The favicon generator API returned an unknown response: ' + util.inspect(result));
        }
      }
    };
  },

  postprocessTree: function(type, tree) {
    if (type === 'all') {
      return replace(tree, {
        files: [ 'index.html' ],
        patterns: [{
          match: /<\/head>/i,
          replacement: function() {
            return (htmlCache || '') + '\n</head>';
          }
        }]
      });
    }
    return tree;
  },

  treeForPublic: function(tree) {
    if (this.options.persistCache !== false) {
      this.options.persistentCacheDir = this.options.persistentCacheDir || 'tmp/.favicon-cache';
    }
    return favicons(tree || 'public', this.options);
  }
};
