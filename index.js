'use strict';

const replace = require('broccoli-replace');
const Favicon = require('broccoli-favicon').default;
const mergeTrees = require('broccoli-merge-trees');

let htmlCache = null;

module.exports = {
  name: require('./package').name,

  included(parent) {
    // Support for fingerprint
    parent.options.fingerprint = parent.options.fingerprint || {};
    parent.options.fingerprint.exclude = parent.options.fingerprint.exclude || [];
    parent.options.fingerprint.exclude.push('apple-touch-icon', 'favicon', 'mstile');

    // Set success callback
    this.addonConfig = parent.options['ember-cli-favicons'] || {};

    let currentCallback = this.addonConfig.onSuccess || function() {};

    this.addonConfig.onSuccess = function(html) {
      htmlCache = html;
      return currentCallback(...arguments);
    };

    this.publicTree = parent.options.trees.public;

    return this._super.included(parent);
  },

  treeForPublic(tree) {
    let faviconTree = new Favicon(this.publicTree, this.addonConfig)
    return mergeTrees([ faviconTree, tree ].filter(Boolean), { overwrite: true });
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
