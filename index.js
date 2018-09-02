'use strict';

const replace = require('broccoli-replace');
const Favicons = require('broccoli-favicon');
const mergeTrees = require('broccoli-merge-trees');

let htmlCache = null;

module.exports = {
  name: 'ember-cli-favicon',

  included(parent) {
    // Support for fingerprint
    parent.options.fingerprint = parent.options.fingerprint || {};
    parent.options.fingerprint.exclude = parent.options.fingerprint.exclude || [];
    parent.options.fingerprint.exclude.push('apple-touch-icon', 'favicon', 'mstile');

    // Set success callback
    parent.options.favicons = parent.options.favicons || {};

    let currentCallback = parent.options.favicons.htmlCallback || function() {};

    parent.options.favicons.htmlCallback = function(html) {
      htmlCache = html;
      return currentCallback(...arguments);
    };

    this.parentOptions = parent.options;

    return this._super.included(parent);
  },

  treeForPublic(tree) {
    let faviconTree = new Favicons(this.parentOptions.trees.public, this.parentOptions.favicons);
    return mergeTrees([ faviconTree, tree ].filter((v) => v), { overwrite: true });
  },

  postprocessTree(type, tree) {
    if (type === 'all') {
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
