# ember-cli-favicon

[![CI](https://github.com/davewasmer/ember-cli-favicon/actions/workflows/ci.yml/badge.svg)](https://github.com/davewasmer/ember-cli-favicon/actions/workflows/ci.yml)
[![Dependency Status](https://david-dm.org/davewasmer/ember-cli-favicon.svg)](https://david-dm.org/davewasmer/ember-cli-favicon.svg)

Take a single favicon source file at `public/favicon.png`, and convert to the various formats and sizes required for popular devices and platforms. Also injects the appropriate HTML into your index.html file during the build process.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-favicon
```

Usage
------------------------------------------------------------------------------

Just save an image to `public/favicon.png` (try to make sure it's at least 256x256). Additional configuration options are supplied in your `ember-cli-build.js` file with following defaults:

```js
// ember-cli-build.js
var app = new EmberApp({
  'ember-cli-favicon': {
    enabled: env != 'test', // By default favicons are NOT generated in TEST env to speedup builds

    onSuccess() {}, // You can call your callback when favicons are generated successfully

    iconPath: 'favicon.png', // icon path related to `public` folder

    // See the [favicons](https://github.com/itgalaxy/favicons) module for details on the available configuration options.
    faviconsConfig: {
      // these options are passed directly to the favicons module
      path: projectConfig.rootUrl,
      appName: package.name,
      appShortName: package.name,
      appDescription: package.description,
      developerName: package.author,
      version: package.version,
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
});
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
