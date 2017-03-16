'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const createNgLibraryApp = (options, prompts) => {
  return helpers.run(path.join(__dirname, '../app'))
    .withOptions(options)
    .withPrompts(prompts || {
      authorName: 'Awesome Developer',
      authorEmail: 'awesome.developer@github.com',
      githubUsername: 'awesomedeveloper',
      projectName: 'my-ngx-library',
      projectVersion: '1.0.0',
      projectDescription: 'Angular library for ...',
      projectkeywords: 'ng, angular,library',
      moduleName: 'my-module',
      ngVersion: '2.0.0',
      ngModules: ['core', 'common']
    });
};

describe('ngx-library:app', () => {
  describe('check generated files', () => {
    before(() => {
      return createNgLibraryApp({
        skipInstall: true,
        skipChecks: true
      });
    });

    it('creates files', () => {
      assert.file([
        // Create project
        'gulpfile.js',
        'LICENSE',
        'package.json',
        'README.md',
        '.editorconfig',
        '.gitignore',
        '.travis.yml',

        // 'deploy.sh',
        'CHANGELOG.md',
        'karma.conf.js',
        'tsconfig-aot.json',
        'tsconfig.json',
        'tslint.json',
        'webpack.config.js',

        // Create Source files
        'src/index.ts',
        'src/my-module.module.ts',

        // Create Demo files
        'demo/e2e/app.e2e-spec.ts',
        'demo/e2e/app.po.ts',
        'demo/e2e/tsconfig.e2e.json',
        'demo/src/app/getting-started/getting-started.component.ts',
        'demo/src/app/getting-started/getting-started.component.html',
        'demo/src/app/getting-started/getting-started.component.scss',
        'demo/src/app/getting-started/getting-started.component.spec.ts',
        'demo/src/app/home/home.component.ts',
        'demo/src/app/home/home.component.html',
        'demo/src/app/home/home.component.scss',
        'demo/src/app/home/home.component.spec.ts',
        'demo/src/app/shared/content-wrapper/content-wrapper.component.ts',
        'demo/src/app/shared/content-wrapper/content-wrapper.component.html',
        'demo/src/app/shared/content-wrapper/content-wrapper.component.scss',
        'demo/src/app/shared/content-wrapper/content-wrapper.component.spec.ts',
        'demo/src/app/shared/footer/footer.component.html',
        'demo/src/app/shared/footer/footer.component.scss',
        'demo/src/app/shared/footer/footer.component.spec.ts',
        'demo/src/app/shared/footer/footer.component.ts',
        'demo/src/app/shared/header/header.component.html',
        'demo/src/app/shared/header/header.component.scss',
        'demo/src/app/shared/header/header.component.spec.ts',
        'demo/src/app/shared/header/header.component.ts',
        'demo/src/app/shared/index.ts',
        'demo/src/app/shared/shared.module.ts',
        'demo/src/app/app.component.spec.ts',
        'demo/src/app/app-routing.ts',
        'demo/src/app/app.component.html',
        'demo/src/app/app.component.scss',
        'demo/src/app/app.component.ts',
        'demo/src/app/app.module.ts',
        'demo/src/assets/.gitkeep',
        'demo/src/assets/.npmignore',
        'demo/src/assets/logo.svg',
        'demo/src/environments/environment.prod.ts',
        'demo/src/environments/environment.ts',
        'demo/src/index.html',
        'demo/src/_variables.scss',
        'demo/src/favicon.ico',
        'demo/src/favicon.ico',
        'demo/src/main.ts',
        'demo/src/polyfills.ts',
        'demo/src/styles.scss',
        'demo/src/test.ts',
        'demo/src/tsconfig.app.json',
        'demo/src/tsconfig.spec.json',
        'demo/src/typings.d.ts',
        'demo/package.json',
        'demo/.angular-cli.json',
        'demo/.editorconfig',
        'demo/.gitignore',
        'demo/karma.conf.js',
        'demo/protractor.conf.js',
        'demo/README.md',
        'demo/tsconfig.json',
        'demo/tslint.json',

        // Create Git files
        '.git/config',
        '.git/description',
        '.git/HEAD',
        '.git/hooks/',
        '.git/info/exclude',

        // Create config files
        'config/helpers.js',
        'config/karma-test-shim.js',
        'config/karma.conf.js',
        'config/webpack.test.js'
      ]);
    });
  });

  describe('check generation for ng2', () => {
    it('should have set appropriate options', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: false
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          moduleName: 'my-module',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common', 'animations']
        });
      return ngLibraryApp.then(() => {
        assert.deepEqual(ngLibraryApp.generator.ngModules, ['core', 'common']);
        assert.deepEqual(ngLibraryApp.generator.devDependencies,
          ['"@angular/compiler" : "2.0.0"',
            '"@angular/platform-server" : "2.0.0"',
            '"@angular/platform-browser" : "2.0.0"',
            '"@angular/platform-browser-dynamic" : "2.0.0"',
            '"@angular/compiler-cli" : "0.6.2"',
            '"zone.js" : "0.6.21"',
            '"rxjs" : "5.0.0-beta.12"']);
      });
    });
  });

  describe('check generation for ng4', () => {
    it('should have set appropriate options', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: false
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          moduleName: 'my-module',
          ngVersion: '4.0.0',
          ngModules: ['core', 'common', 'animations']
        });
      return ngLibraryApp.then(() => {
        assert.deepEqual(ngLibraryApp.generator.ngModules, ['core', 'common', 'animations']);
        assert.deepEqual(ngLibraryApp.generator.devDependencies,
          ['"@angular/compiler" : "4.0.0"',
            '"@angular/platform-server" : "4.0.0"',
            '"@angular/platform-browser" : "4.0.0"',
            '"@angular/platform-browser-dynamic" : "4.0.0"',
            '"@angular/compiler-cli" : "4.0.0"',
            '"zone.js" : "0.8.4"',
            '"rxjs" : "5.0.1"']);
      });
    });
  });

  describe('check generation without skipping installation of dependencies', () => {
    it('should install dependencies and run initial build', function () {
      this.timeout(300000); // Increase timeout to allow install of deps/initial build to finish
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: false,
        skipChecks: false
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipInstall, false);
      });
    });
  });

  describe('check yarn', () => {
    it('should set "useYarn" to true if not using npm ', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        npm: false
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.useYarn, true);
      });
    });

    it('should set "useYarn" to false if  using npm ', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        npm: true
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.useYarn, false);
      });
    });
  });
});
