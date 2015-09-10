'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('ng-plugin:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        'authorName': 'Tine Kondo',
        'githubUsername': 'tinesoft',
        'projectName': 'ng-plugin',
        'projectVersion': '1.0.0',
        'angularVersion': '>=1.0.8',
        'ngModuleName': 'ngModule',
        'ngDirectiveName': 'directive-name',
        'projectDescription': 'AngularJS plugin for ...',
        'mainColor': ''
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'bower.json',
      'CHANGELOG.md',
      'README.md',
      'LICENSE',
      '.bowerrc',
      '.gitignore',
      '.travis.yml',
      '.gitattributes',

      'build.config.js',
      'changelog.tpl',
      'karma-unit.tpl.js',
      'module.prefix',
      'module.suffix',
      'Gruntfile.js',

      // Source files
      'src/ng-plugin.js',
      'src/ng-plugin.spec.js',
      'src/ng-plugin.tpl.html',
      'src/ng-plugin.less',

      // Demo files
      'demo/index.html',
      'demo/app/app.js',
      'demo/less/demo.less',
      'demo/app/helpers/plunker.js',
      'demo/app/helpers/prettifyDirective.js',
    ]);
  });
});
