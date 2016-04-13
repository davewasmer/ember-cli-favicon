# ember-cli-favicon

[![Build Status](https://travis-ci.org/davewasmer/ember-cli-favicon.svg?branch=master)](https://travis-ci.org/davewasmer/ember-cli-favicon)
[![Dependency Status](https://david-dm.org/davewasmer/ember-cli-favicon.svg)](https://david-dm.org/davewasmer/ember-cli-favicon.svg)

Take a single favicon source file at `public/favicon.png`, and convert to the various formats and sizes required for popular devices and platforms. Also injects the appropriate HTML into your index.html file during the build process.

## Installation

```sh
$ ember install ember-cli-favicon
```

## Usage

Just save an image to `public/favicon.png` (try to make sure it's at least 256x256). Additional configuration options are supplied in your `ember-cli-build.js` file:

```js
// ember-cli-build.js
var app = new EmberApp({
  favicon: {
    config: {
      // these options are passed directly to the favicons module
    }
  }
});
```

See the [favicons](https://github.com/haydenbleasel/favicons) module for details on the available configuration options.

