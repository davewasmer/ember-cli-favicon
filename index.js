/* jshint node: true */
'use strict';

var replace = require('broccoli-replace');
var favicons = require('broccoli-favicon');

var htmlCache = '';
module.exports = {

  name: 'ember-cli-favicon',

  included: function(app) {
    this.options = app.favicons || {};
    this.options.callback = function(html) {
      htmlCache = html || htmlCache;
    };
  },

  postprocessTree: function(type, tree) {
    if (type === 'all') {
      return replace(tree, {
        files: [ 'index.html' ],
        patterns: [{
          match: /<\/head>/i,
          replacement: function() {
            return htmlCache + '\n</head>';
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
