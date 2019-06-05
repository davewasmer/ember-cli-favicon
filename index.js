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

    // Set default options
    let isProductionEnv = parent.env === 'production'

    let defaultOptions = {
      enabled: parent.env != 'test',
      faviconsConfig: {
        path: parent.project.config(parent.env).rootUrl,
        appName: parent.project.pkg.name,
        appShortName: parent.project.pkg.name,
        appDescription: parent.project.pkg.description,
        developerName: parent.project.pkg.author,
        version: parent.project.version,
        icons: {
          favicons: true,
          android: isProductionEnv,
          appleIcon: isProductionEnv,
          appleStartup: isProductionEnv,
          coast: isProductionEnv,
          firefox: isProductionEnv,
          windows: isProductionEnv,
          yandex: isProductionEnv
        }
      }
    }

    this.addonConfig = deepMerge({}, defaultOptions, (parent.options['ember-cli-favicon'] || {}));

    // Set success callback
    let currentCallback = this.addonConfig.onSuccess || function() {};

    this.addonConfig.onSuccess = function(html) {
      htmlCache = html;
      return currentCallback(...arguments);
    };

    // Support for fingerprint
    parent.options.fingerprint = parent.options.fingerprint || {};
    parent.options.fingerprint.exclude = parent.options.fingerprint.exclude || [];
    parent.options.fingerprint.exclude.push(
      'android-chrome',
      'apple-touch-icon',
      'apple-touch-startup-image',
      'coast',
      'favicon',
      'mstile',
      'firefox_app',
      'yandex-browser'
    );

    this.publicTree = parent.options.trees.public;
  },

  treeForPublic(tree) {
    if (this.addonConfig.enabled) {
      let faviconTree = new Favicon(this.publicTree, this.addonConfig)
      return mergeTrees([ faviconTree, tree ].filter(Boolean), { overwrite: true });
    } else {
      return tree;
    }
  },

  postprocessTree(type, tree) {
    if (type === 'all' && this.addonConfig.enabled) {
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
