'use strict';

const replace = require('broccoli-replace');
const Favicon = require('broccoli-favicon').default;
const mergeTrees = require('broccoli-merge-trees');
const deepMerge = require('lodash.merge');

let htmlCache = null;

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments);

    // Support for fingerprint
    parent.options.fingerprint = parent.options.fingerprint || {};
    parent.options.fingerprint.exclude = parent.options.fingerprint.exclude || [];
    parent.options.fingerprint.exclude.push('apple-touch-icon', 'favicon', 'mstile');

    // Set default options
    let defaultOptions = {
      faviconsConfig: {
        path: parent.project.config(parent.env).rootUrl,
        appName: parent.project.pkg.name,
        appShortName: parent.project.pkg.name,
        appDescription: parent.project.pkg.description,
        developerName: parent.project.pkg.author,
        version: parent.project.version
      }
    }

    this.addonConfig = deepMerge({}, defaultOptions, (parent.options['ember-cli-favicons'] || {}));

    // Set success callback
    let currentCallback = this.addonConfig.onSuccess || function() {};

    this.addonConfig.onSuccess = function(html) {
      htmlCache = html;
      return currentCallback(...arguments);
    };

    this.publicTree = parent.options.trees.public;
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
