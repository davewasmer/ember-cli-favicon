'use strict';

const replace = require('broccoli-replace');
const Favicons = require('broccoli-favicon');
const mergeTrees = require('broccoli-merge-trees');

let htmlCache = null;

module.exports = {

  name: 'ember-cli-favicon',

  included(app) {
    let options = app.options;

    let fingerprint = options.fingerprint = options.fingerprint || {};
    fingerprint.exclude = fingerprint.exclude || [];
    fingerprint.exclude.push('apple-touch-icon', 'favicon', 'mstile');

    this.options = options.favicons || {};
    this.options.htmlCallback = function(html) {
      htmlCache = html;
    };
  },

  postprocessTree(type, tree) {
    if (type === 'all') {
      const favicons = new Favicons(tree, this.options);
      tree = mergeTrees([ favicons, tree ], { overwrite: true });
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
