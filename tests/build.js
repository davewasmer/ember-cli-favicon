/* eslint-env node  */
/* eslint-env mocha */
const cp = require('child_process');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const md5 = require('md5-file').sync;

describe('favicons', function() {
  it('should generate favicon images and html', function() {
    this.timeout(0);
    cp.execSync(path.join('node_modules', '.bin', 'ember') + ' build');
    assert(fs.existsSync(path.join('dist', 'favicon-16x16.png')), 'Favicons were generated');
    assert.equal(md5(path.join('dist', 'firefox_app_128x128.png')), md5(path.join('tests', 'dummy', 'public', 'firefox_app_128x128.png')), 'Pre-existing favicons win out');
    let index = fs.readFileSync(path.join('dist', 'index.html'), 'utf-8');
    assert(index.indexOf('link rel="icon"'), 'Favicon html was injected');
  });
});
