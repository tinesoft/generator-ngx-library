'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');

const createNgLibraryApp = (options, prompts) => {
  return helpers.run(path.join(__dirname, '../app'))
    .withOptions(options)
    .withPrompts(Object.assign({
      authorName: 'Awesome Developer',
      authorEmail: 'awesome.developer@github.com',
      githubUsername: 'awesomedeveloper',
      githubRepoName: 'my-ngx-library',
      projectName: 'my-ngx-library',
      projectVersion: '1.0.0',
      projectDescription: 'Angular library for ...',
      projectkeywords: 'ng, angular,library',
      ngPrefix: 'my-lib',
      testingFramework: 'karma',
      ngVersion: '2.0.0',
      ngModules: ['core', 'common'],
      additionalPackageFiles: 'styles/*.scss, images/*.(png|jpg)',
      useGreenkeeper: true,
      useCompodoc: false,
      enforceNgGitCommitMsg: true
    }, prompts || {}));
};

describe('ngx-library:app', () => {
  describe('check generated files', () => {
    it('should create files', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true
      });
      return ngLibraryApp.then(() => {
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
          'tsconfig.json',
          'tslint.json',
          'webpack.config.js',

          // Create Source files
          'src/index.ts',
          'src/module/component/lib.component.html',
          'src/module/component/lib.component.spec.ts',
          'src/module/component/lib.component.ts',
          'src/module/component/lib.component.scss',
          'src/module/service/lib.service.ts',
          'src/module/service/lib.service.spec.ts',
          'src/module/lib.module.ts',
          'src/tsconfig.lib.json',
          'src/tsconfig.spec.json',

          // Create Demo files
          'demo/e2e/src/app.e2e-spec.ts',
          'demo/e2e/src/app.po.ts',
          'demo/e2e/tsconfig.e2e.json',
          'demo/e2e/protractor.conf.js',
          'demo/src/app/getting-started/getting-started-routing.module.ts',
          'demo/src/app/getting-started/getting-started.component.ts',
          'demo/src/app/getting-started/getting-started.component.html',
          'demo/src/app/getting-started/getting-started.component.scss',
          'demo/src/app/getting-started/getting-started.component.spec.ts',
          'demo/src/app/getting-started/getting-started.module.ts',
          'demo/src/app/home/home-routing.module.ts',
          'demo/src/app/home/home.component.ts',
          'demo/src/app/home/home.component.html',
          'demo/src/app/home/home.component.scss',
          'demo/src/app/home/home.component.spec.ts',
          'demo/src/app/home/home.module.ts',
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
          'demo/src/app/app-routing.module.ts',
          'demo/src/app/app.component.html',
          'demo/src/app/app.component.scss',
          'demo/src/app/app.component.ts',
          'demo/src/app/app.module.ts',
          'demo/src/assets/.gitkeep',
          'demo/src/assets/.npmignore',
          'demo/src/assets/logo.svg',
          'demo/src/environments/environment.hmr.ts',
          'demo/src/environments/environment.prod.ts',
          'demo/src/environments/environment.ts',
          'demo/src/testing/index.ts',
          'demo/src/testing/router-stubs.ts',
          'demo/src/index.html',
          'demo/src/_variables.scss',
          'demo/src/browserslist',
          'demo/src/favicon.ico',
          'demo/src/hmr.ts',
          'demo/src/karma.conf.js',
          'demo/src/main.server.ts',
          'demo/src/main.ts',
          'demo/src/polyfills.ts',
          'demo/src/styles.scss',
          'demo/src/test.ts',
          'demo/src/tsconfig.app.json',
          'demo/src/tsconfig.spec.json',
          'demo/src/typings.d.ts',
          'demo/package.json',
          'demo/angular.json',
          'demo/.editorconfig',
          'demo/.gitignore',
          'demo/prerender.ts',
          'demo/tsconfig.json',
          'demo/server.ts',
          'demo/tsconfig.json',
          'demo/tslint.json',

          // Create Git files
          '.git/config',
          '.git/description',
          '.git/HEAD',
          '.git/hooks/',
          '.git/info/exclude',

          // Create Github files
          '.github/ISSUE_TEMPLATE.md',

          // Create config files
          'config/helpers.js',
          'config/karma-test-shim.js',
          'config/karma.conf.js',
          'config/webpack.test.js',
          'config/gulp-tasks/README.md'
        ]);

        assert.fileContent('gulpfile.js', `      gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md', 'styles/*.scss', 'images/*.(png|jpg)',`);
      });
    });
  });

  describe('check generation for ng2', () => {
    it('should have set appropriate properties', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: false
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common', 'animations', 'bazel', 'service-worker', 'elements'],
          useGreenkeeper: true,
          useCompodoc: false
        });
      return ngLibraryApp.then(() => {
        assert.deepEqual(ngLibraryApp.generator.ngModules, ['core', 'common']);
        assert.deepEqual(ngLibraryApp.generator.ngDevDependencies,
          ['"@angular/compiler" : "2.0.0"',
            '"@angular/platform-server" : "2.0.0"',
            '"@angular/platform-browser" : "2.0.0"',
            '"@angular/platform-browser-dynamic" : "2.0.0"',
            '"@angular/compiler-cli" : "0.6.2"',
            '"zone.js" : "0.6.21"',
            '"rxjs" : "5.0.0-beta.12"',
            '"tslint" : "3.15.1"',
            '"gulp-tslint" : "6.1.1"',
            '"typescript" : "2.0.3"',
            '"awesome-typescript-loader" : "3.0.5"',
            '"codelyzer" : "1.0.0-beta.0"']);
        assert.noFile([
          'src/tsconfig.lib.es5.json'
        ]);
      });
    });
  });

  describe('check generation for ng4', () => {
    it('should have set appropriate properties', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: false
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '4.0.0',
          ngModules: ['core', 'common', 'animations', 'bazel', 'service-worker', 'elements'],
          useGreenkeeper: true,
          useCompodoc: false
        });
      return ngLibraryApp.then(() => {
        assert.deepEqual(ngLibraryApp.generator.ngModules, ['core', 'common', 'animations']);
        assert.deepEqual(ngLibraryApp.generator.ngDevDependencies,
          ['"@angular/compiler" : "4.0.0"',
            '"@angular/platform-server" : "4.0.0"',
            '"@angular/platform-browser" : "4.0.0"',
            '"@angular/platform-browser-dynamic" : "4.0.0"',
            '"@angular/compiler-cli" : "4.0.0"',
            '"zone.js" : "0.8.13"',
            '"rxjs" : "5.0.1"',
            '"tslint" : "5.4.3"',
            '"gulp-tslint" : "8.1.1"',
            '"typescript" : "2.3.3"',
            '"awesome-typescript-loader" : "3.0.5"',
            '"codelyzer" : "3.1.1"']);
        assert.file([
          'src/tsconfig.lib.es5.json'
        ]);
      });
    });
  });

  describe('check generation for ng5', () => {
    it('should have set appropriate properties', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: false
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '5.0.0',
          ngModules: ['core', 'common', 'animations', 'bazel', 'service-worker', 'elements'],
          useGreenkeeper: true,
          useCompodoc: false
        });
      return ngLibraryApp.then(() => {
        assert.deepEqual(ngLibraryApp.generator.ngModules, ['core', 'common', 'animations', 'bazel', 'service-worker']);
        assert.deepEqual(ngLibraryApp.generator.ngDevDependencies,
          ['"@angular/compiler" : "5.0.0"',
            '"@angular/platform-server" : "5.0.0"',
            '"@angular/platform-browser" : "5.0.0"',
            '"@angular/platform-browser-dynamic" : "5.0.0"',
            '"@angular/compiler-cli" : "5.0.0"',
            '"zone.js" : "0.8.14"',
            '"rxjs" : "5.5.2"',
            '"tslint" : "5.7.0"',
            '"gulp-tslint" : "8.1.1"',
            '"typescript" : "2.4.2"',
            '"awesome-typescript-loader" : "3.3.0"',
            '"codelyzer" : "4.0.0"']);
        assert.file([
          'src/tsconfig.lib.es5.json'
        ]);
      });
    });
  });

  describe('check generation for ng6', () => {
    it('should have set appropriate properties', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: false
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '6.0.0',
          ngModules: ['core', 'common', 'animations', 'bazel', 'service-worker', 'elements'],
          useGreenkeeper: true,
          useCompodoc: false
        });
      return ngLibraryApp.then(() => {
        assert.deepEqual(ngLibraryApp.generator.ngModules, ['core', 'common', 'animations', 'bazel', 'service-worker', 'elements']);
        assert.deepEqual(ngLibraryApp.generator.ngDevDependencies,
          ['"@angular/compiler" : "6.0.0"',
            '"@angular/platform-server" : "6.0.0"',
            '"@angular/platform-browser" : "6.0.0"',
            '"@angular/platform-browser-dynamic" : "6.0.0"',
            '"@angular/compiler-cli" : "6.0.0"',
            '"zone.js" : "0.8.26"',
            '"rxjs" : "6.0.0"',
            '"tslint" : "5.7.0"',
            '"gulp-tslint" : "8.1.3"',
            '"typescript" : "2.7.2"',
            '"awesome-typescript-loader" : "5.0.0"',
            '"codelyzer" : "4.2.1"']);
        assert.file([
          'src/tsconfig.lib.es5.json'
        ]);
      });
    });
  });

  describe('check generation without skipping installation of dependencies', () => {
    it('should install dependencies and run initial build', () => {
      let runInstall = jest.fn(() => Promise.resolve());
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: false,
        skipChecks: false
      }).on('ready', generator => {
        generator.runInstall = runInstall;
      });
      return ngLibraryApp.then(() => {
        expect(ngLibraryApp.generator.skipInstall).toBe(false);
        expect(runInstall.mock.calls.length).toBe(1);
        expect(runInstall.mock.calls[0][0]).toEqual('yarn');
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

  describe('check greenkeeper', () => {
    it('should add greenkeeper-related code in "package.json" & "README.md" if "useGreenkeeper" is set to true ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: true,
          useCompodoc: false
        });
      return ngLibraryApp.then(() => {
        let greenkeeperExclusions = ngLibraryApp.generator.greenkeeperExclusions;
        assert.equal(ngLibraryApp.generator.useGreenkeeper, true);
        assert.notDeepEqual(greenkeeperExclusions, []);
        assert.fileContent('package.json', `  "greenkeeper": {\n    "ignore": [\n      ${greenkeeperExclusions.join(',\n      ')}\n    ]\n  }`);
        assert.fileContent('README.md', '[![Greenkeeper Badge](https://badges.greenkeeper.io/awesomedeveloper/my-ngx-library.svg)](https://greenkeeper.io/)');
      });
    });

    it('should not add greenkeeper-related code in "package.json" & "README.md" if "useGreenkeeper" is set to false ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: false,
          useCompodoc: false
        });
      return ngLibraryApp.then(() => {
        let greenkeeperExclusions = ngLibraryApp.generator.greenkeeperExclusions;
        assert.equal(ngLibraryApp.generator.useGreenkeeper, false);
        assert.deepEqual(greenkeeperExclusions, []);
        assert.noFileContent('package.json', '  "greenkeeper":');
        assert.noFileContent('README.md', '![Greenkeeper Badge]');
      });
    });
  });

  describe('check compodoc', () => {
    it('should add compodoc-related code if "useCompodoc" is set to true ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: false,
          useCompodoc: true
        });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.useCompodoc, true);
        assert.file('demo/proxy.conf.json');
        assert.fileContent('package.json', '    "@compodoc/gulp-compodoc":');
        assert.fileContent('gulpfile.js', /gulp\.task\('(serve|build|clean):doc'/);
      });
    });

    it('should not add compodoc-related code if "useCompodoc" is set to false ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: false,
          useCompodoc: false
        });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.useCompodoc, false);
        assert.noFile('demo/proxy.conf.json');
        assert.noFileContent('package.json', '    "@compodoc/gulp-compodoc":');
        assert.noFileContent('gulpfile.js', `gulp.task('build:doc'`);
        assert.noFileContent('gulpfile.js', /gulp\.task\('(serve|build|clean):doc'/);
      });
    });
  });

  describe('check enforceNgGitCommitMsg', () => {
    it('should add enforceNgGitCommitMsg-related code if "enforceNgGitCommitMsg" is set to true ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: false,
          useCompodoc: true,
          enforceNgGitCommitMsg: true
        });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.enforceNgGitCommitMsg, true);
        assert.fileContent('package.json', '    "commitplease":');
      });
    });

    it('should not add enforceNgGitCommitMsg-related code if "enforceNgGitCommitMsg" is set to false ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: false,
          useCompodoc: false,
          enforceNgGitCommitMsg: false
        });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.enforceNgGitCommitMsg, false);
        assert.noFileContent('package.json', '    "commitplease":');
      });
    });
  });

  describe('check testingFramework', () => {
    it('should add jest-related code if "testingFramework" is set to "jest" ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'jest',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: false,
          useCompodoc: false,
          enforceNgGitCommitMsg: false
        });
      return ngLibraryApp.then(() => {
        assert.fileContent('package.json', '    "jest":');
        assert.file([
          'config/jestGlobalMocks.ts',
          'config/setupJest.ts'
        ]);
        assert.noFile([
          'config/webpack.test.js',
          'config/karma-test-shim.js',
          'config/karma.conf.js'
        ]);
      });
    });

    it('should add karma-related code if "testingFramework" is set to "karma" ', () => {
      let ngLibraryApp = createNgLibraryApp(
        {
          skipInstall: true,
          skipChecks: true
        },
        {
          authorName: 'Awesome Developer',
          authorEmail: 'awesome.developer@github.com',
          githubUsername: 'awesomedeveloper',
          githubRepoName: 'my-ngx-library',
          projectName: 'my-ngx-library',
          projectVersion: '1.0.0',
          projectDescription: 'Angular library for ...',
          projectkeywords: 'ng, angular,library',
          ngPrefix: 'my-lib',
          testingFramework: 'karma',
          ngVersion: '2.0.0',
          ngModules: ['core', 'common'],
          useGreenkeeper: false,
          useCompodoc: false,
          enforceNgGitCommitMsg: false
        });
      return ngLibraryApp.then(() => {
        assert.noFileContent('package.json', '    "jest":');
        assert.file([
          'config/webpack.test.js',
          'config/karma-test-shim.js',
          'config/karma.conf.js'
        ]);
        assert.noFile([
          'config/jestGlobalMocks.ts',
          'config/setupJest.ts'
        ]);
      });
    });
  });

  describe('check "skipStyles" option', () => {
    it('should not generate styles-related code when "skipStyles" is set to true', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipStyles: true
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipStyles, true);

        assert.noFileContent('package.json', '    "css-loader":');
        assert.noFileContent('package.json', '    "node-sass":');
        assert.noFileContent('package.json', '    "sass-loader":');
        assert.noFileContent('package.json', '    "to-string-loader":');
        assert.noFileContent('package.json', '    "autoprefixer":');
        assert.noFileContent('package.json', '    "cssnano":');
        assert.noFileContent('package.json', '    "postcss":');
        assert.noFileContent('package.json', '    "postcss-strip-inline-comments":');
      });
    });

    it('should generate styles-related code when "skipStyles" is set to false', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipStyles: false
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipStyles, false);

        assert.fileContent('package.json', '    "css-loader":');
        assert.fileContent('package.json', '    "node-sass":');
        assert.fileContent('package.json', '    "sass-loader":');
        assert.fileContent('package.json', '    "to-string-loader":');
        assert.fileContent('package.json', '    "autoprefixer":');
        assert.fileContent('package.json', '    "cssnano":');
        assert.fileContent('package.json', '    "postcss":');
        assert.fileContent('package.json', '    "postcss-strip-inline-comments":');
      });
    });
  });

  describe('check "skipDemo" option', () => {
    it('should not generate demo-related code when "skipDemo" is set to true', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipDemo: true
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipDemo, true);
        assert.noFile([
          'demo/e2e/src/app.e2e-spec.ts',
          'demo/e2e/src/app.po.ts',
          'demo/e2e/protractor.conf.js',
          'demo/e2e/tsconfig.e2e.json',
          'demo/src/app/getting-started/getting-started-routing.module.ts',
          'demo/src/app/getting-started/getting-started.component.ts',
          'demo/src/app/getting-started/getting-started.component.html',
          'demo/src/app/getting-started/getting-started.component.scss',
          'demo/src/app/getting-started/getting-started.component.spec.ts',
          'demo/src/app/getting-started/getting-started.module.ts',

          'demo/src/app/home/home-routing.module.ts',
          'demo/src/app/home/home.component.ts',
          'demo/src/app/home/home.component.html',
          'demo/src/app/home/home.component.html',
          'demo/src/app/home/home.component.scss',
          'demo/src/app/home/home.component.spec.ts',
          'demo/src/app/home/home.module.ts',
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
          'demo/src/app/app-routing.module.ts',
          'demo/src/app/app.component.html',
          'demo/src/app/app.component.scss',
          'demo/src/app/app.component.spec.ts',
          'demo/src/app/app.component.ts',
          'demo/src/app/app.module.ts',
          'demo/src/app/app.server.module.ts',
          'demo/src/assets/.gitkeep',
          'demo/src/assets/.npmignore',
          'demo/src/assets/logo.svg',
          'demo/src/environments/environment.hmr.ts',
          'demo/src/environments/environment.prod.ts',
          'demo/src/environments/environment.ts',
          'demo/src/testing/index.ts',
          'demo/src/testing/router-stubs.ts',
          'demo/src/index.html',
          'demo/src/_variables.scss',
          'demo/src/browserslist',
          'demo/src/favicon.ico',
          'demo/src/hmr.ts',
          'demo/src/karma.conf.js',
          'demo/src/main.server.ts',
          'demo/src/main.ts',
          'demo/src/polyfills.ts',
          'demo/src/styles.scss',
          'demo/src/test.ts',
          'demo/src/tsconfig.app.json',
          'demo/src/tsconfig.server.json',
          'demo/src/tsconfig.spec.json',
          'demo/src/typings.d.ts',
          'demo/package.json',
          'demo/angular.json',
          'demo/.editorconfig',
          'demo/.gitignore',
          'demo/prerender.ts',
          'demo/README.md',
          'demo/server.ts',
          'demo/static.paths.ts',
          'demo/tsconfig.json',
          'demo/tslint.json',
          'demo/webpack.server.config.js'
        ]);
        assert.noFileContent('gulpfile.js', /gulp\.task\('(test|serve|build|push|deploy):demo(-ssr)?'/);
      });
    });

    it('should generate demo-related code when "skipDemo" is set to false', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipDemo: false
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipDemo, false);
        assert.file([
          'demo/e2e/src/app.e2e-spec.ts',
          'demo/e2e/src/app.po.ts',
          'demo/e2e/protractor.conf.js',
          'demo/e2e/tsconfig.e2e.json',
          'demo/src/app/getting-started/getting-started-routing.module.ts',
          'demo/src/app/getting-started/getting-started.component.ts',
          'demo/src/app/getting-started/getting-started.component.html',
          'demo/src/app/getting-started/getting-started.component.scss',
          'demo/src/app/getting-started/getting-started.component.spec.ts',
          'demo/src/app/getting-started/getting-started.module.ts',
          'demo/src/app/home/home-routing.module.ts',
          'demo/src/app/home/home.component.ts',
          'demo/src/app/home/home.component.html',
          'demo/src/app/home/home.component.scss',
          'demo/src/app/home/home.component.spec.ts',
          'demo/src/app/home/home.module.ts',
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
          'demo/src/app/app-routing.module.ts',
          'demo/src/app/app.component.html',
          'demo/src/app/app.component.scss',
          'demo/src/app/app.component.spec.ts',
          'demo/src/app/app.component.ts',
          'demo/src/app/app.module.ts',
          'demo/src/app/app.server.module.ts',
          'demo/src/assets/.gitkeep',
          'demo/src/assets/.npmignore',
          'demo/src/assets/logo.svg',
          'demo/src/environments/environment.prod.ts',
          'demo/src/environments/environment.ts',
          'demo/src/testing/index.ts',
          'demo/src/testing/router-stubs.ts',
          'demo/src/index.html',
          'demo/src/_variables.scss',
          'demo/src/browserslist',
          'demo/src/favicon.ico',
          'demo/src/karma.conf.js',
          'demo/src/main.server.ts',
          'demo/src/main.ts',
          'demo/src/polyfills.ts',
          'demo/src/styles.scss',
          'demo/src/test.ts',
          'demo/src/tsconfig.app.json',
          'demo/src/tsconfig.server.json',
          'demo/src/tsconfig.spec.json',
          'demo/src/typings.d.ts',
          'demo/package.json',
          'demo/angular.json',
          'demo/.editorconfig',
          'demo/.gitignore',
          'demo/prerender.ts',
          'demo/README.md',
          'demo/server.ts',
          'demo/static.paths.ts',
          'demo/tsconfig.json',
          'demo/tslint.json',
          'demo/webpack.server.config.js'
        ]);
        assert.fileContent('gulpfile.js', /gulp\.task\('(test|serve|build|push|deploy):demo(-ssr)?'/);
      });
    });
  });

  describe('check "skipSample" option', () => {
    it('should not generate sample lib related code when "skipSample" is set to true', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipSample: true
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipSample, true);
        assert.noFile([
          'src/module/component/lib.component.html',
          'src/module/component/lib.component.spec.ts',
          'src/module/component/lib.component.ts',
          'src/module/component/lib.component.scss',
          'src/module/service/lib.service.ts',
          'src/module/service/lib.service.spec.ts',
          'src/module/lib.module.ts'
        ]);
      });
    });

    it('should generate sample lib related code when "skipSample" is set to false', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipSample: false
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipSample, false);

        assert.file([
          'src/module/component/lib.component.html',
          'src/module/component/lib.component.spec.ts',
          'src/module/component/lib.component.ts',
          'src/module/component/lib.component.scss',
          'src/module/service/lib.service.ts',
          'src/module/service/lib.service.spec.ts',
          'src/module/lib.module.ts'
        ]);
      });
    });
  });

  describe('check "skipTravis" option', () => {
    it('should not generate travis-related code when "skipTravis" is set to true', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipTravis: true
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipTravis, true);

        assert.noFileContent('package.json', '    "travis-status":');
        assert.noFile('.travis.yml');
      });
    });

    it('should generate travis-related code when "skipTravis" is set to false', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipTravis: false
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipTravis, false);

        assert.fileContent('package.json', '    "travis-status":');
        assert.file('.travis.yml');
      });
    });
  });

  describe('check "skipCoveralls" option', () => {
    it('should not generate coveralls-related code when "skipCoveralls" is set to true', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipCoveralls: true
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipCoveralls, true);

        assert.noFileContent('package.json', '    "gulp-coveralls":');
        assert.noFileContent('gulpfile.js', /gulp\.task\('coveralls'/);
      });
    });

    it('should generate coveralls-related code when "skipCoveralls" is set to false', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipCoveralls: false
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipCoveralls, false);

        assert.fileContent('package.json', '    "gulp-coveralls":');
        assert.fileContent('gulpfile.js', /gulp\.task\('coveralls'/);
      });
    });
  });

  describe('check "skipGhReleasing" option', () => {
    it('should not generate github-releasing-related code when "skipGhReleasing" is set to true', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipGhReleasing: true
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipGhReleasing, true);

        assert.noFileContent('package.json', '    "conventional-github-releaser":');
        assert.noFileContent('gulpfile.js', /gulp\.task\('github-release'/);
      });
    });

    it('should generate github-releasing-related code when "skipGhReleasing" is set to false', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipGhReleasing: false
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.skipGhReleasing, false);

        assert.fileContent('package.json', '    "conventional-github-releaser":');
        assert.fileContent('gulpfile.js', /gulp\.task\('github-release'/);
      });
    });
  });

  describe('check "delExcludedFiles" option', () => {
    it('should not delete excluded files when "delExcludedFiles" is set to false', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipDemo: true,
        delExcludedFiles: false
      }).inTmpDir(dir => {// Simulates presence of excluded files (demo)
        fs.copySync(path.join(__dirname, '../app/templates/demo'), path.join(dir, 'demo'));
      });
      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.delExcludedFiles, false);

        assert.file('demo/src/karma.conf.js');
        assert.file('demo/tsconfig.json');
        assert.file('demo/tslint.json');
      });
    });

    it('should delete excluded files code when "delExcludedFiles" is set to true', () => {
      let ngLibraryApp = createNgLibraryApp({
        skipInstall: true,
        skipChecks: true,
        skipDemo: true,
        delExcludedFiles: true
      }).inTmpDir(dir => {// Simulates presence of excluded files (demo)
        fs.copySync(path.join(__dirname, '../app/templates/demo'), path.join(dir, 'demo'));
      });

      return ngLibraryApp.then(() => {
        assert.equal(ngLibraryApp.generator.delExcludedFiles, true);

        assert.noFile('demo/src/karma.conf.js');
        assert.noFile('demo/tsconfig.json');
        assert.noFile('demo/tslint.json');
      });
    });
  });

  it('should only delete excluded files not in "deleteExclusions" if "delExcludedFiles" set to true and ', () => {
    let ngLibraryApp = createNgLibraryApp({
      skipInstall: true,
      skipChecks: true,
      skipDemo: true,
      delExcludedFiles: true
    }).withLocalConfig({
      deleteExclusions: ['demo/tsconfig.json', 'demo/tslint.json']
    }).inTmpDir(dir => {// Simulates presence of excluded files (demo)
      fs.copySync(path.join(__dirname, '../app/templates/demo'), path.join(dir, 'demo'));
    });
    return ngLibraryApp.then(() => {
      assert.equal(ngLibraryApp.generator.delExcludedFiles, true);

      assert.noFile('demo/src/app/app-routing.module.ts');
      assert.noFile('demo/src/app/app.component.html');
      assert.noFile('demo/src/app/app.component.scss');

      assert.file('demo/tsconfig.json');
      assert.file('demo/tslint.json');
    });
  });
});
