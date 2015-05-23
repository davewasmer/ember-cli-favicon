# Ember-cli-favicon

This README outlines the details of collaborating on this Ember addon.

## Installation

```sh
$ ember install ember-cli-favicon
```

## Usage

Just save an image to `public/favicon.png` (try to make sure it's at least 256x256). If you want to include different favicons for the different platforms,
you can either supply different images with a filename that matches the platform, i.e.:

```
public/android.png
public/appleIcon.png
public/appleStartup.png
public/coast.png
public/firefox.png
public/opengraph.png
public/windows.png
public/yandex.png
```

Or you can supply your own image paths via config, if you don't want to generate favicons for all those platforms (this config is passed directly into the [favicons](https://github.com/haydenbleasel/favicons) module):

```js
// Brocfile.js
var app = new EmberApp({
  favicon: {
    // config here
  }
});
```

## ZOMG!!1! 30 seconds to build?

This addon uses the [favicons](https://github.com/haydenbleasel/favicons) module, which makes a call to the RealFaviconGenerator API to generate your favicons, hence the ridiculously long builds. But it caches the results and only rebuilds on changes (including across ember server restarts!), and you don't change your favicon that often, right?

Why an API for something like this? Well, proper favicon support is tricky and ever evolving. Sure you could probably generate this on your local machine using some imagemagick binding or something, but then you or I would have to become an expert on favicons to make sure this package stayed up to date. And there are already experts out there. They even built an API. So let's use that.

Hence the long build times.
