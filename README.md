# ember-cli-favicon

[![Build Status](https://travis-ci.org/davewasmer/ember-cli-favicon.svg?branch=master)](https://travis-ci.org/davewasmer/ember-cli-favicon)
[![Dependency Status](https://david-dm.org/davewasmer/ember-cli-favicon.svg)](https://david-dm.org/davewasmer/ember-cli-favicon.svg)

Take a single favicon source file at `public/favicon.png`, and convert to the various formats and sizes required for popular devices and platforms. Also injects the appropriate HTML into your index.html file during the build process.

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-favicon
```

Usage
------------------------------------------------------------------------------

Just save an image to `public/favicon.png` (try to make sure it's at least 256x256). Additional configuration options are supplied in your `ember-cli-build.js` file:

```js
// ember-cli-build.js
var app = new EmberApp({
  favicons: {
    faviconsConfig: {
      // these options are passed directly to the favicons module
    }
  }
});
```

See the [favicons](https://github.com/haydenbleasel/favicons) module for details on the available configuration options.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/davewasmer/broccoli-favicon`
* `cd ember-cli-favicon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
