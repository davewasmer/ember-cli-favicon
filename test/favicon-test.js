var cp = require('child_process');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('favicons', function() {
  it('should generate favicon images and html', function() {
    this.timeout(60000);
    cp.execSync('./node_modules/.bin/ember build');
    assert(fs.existsSync(path.join('dist', 'favicon-16x16.png')), 'Favicons were generated');
    var index = fs.readFileSync(path.join('dist', 'index.html'), 'utf-8');
    assert(index.indexOf('link rel="icon"'), 'Favicon html was injected');
  });
});
