/* eslint-disable no-warning-comments */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const exec = require('child_process').exec;
const _ = require('lodash');

const prompts = require('./prompts');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    // This adds support for a `--skip-checks` flag
    this.option('skip-checks', {
      description: 'Skip checking the status of the required tools',
      type: Boolean,
      defaults: false
    });

    // This adds support for a `--skip-styles` flag
    this.option('skip-styles', {
      description: 'Skip generation of code to inline styles in Angular components',
      type: Boolean,
      defaults: false
    });

    // This adds support for a `--skip-demo` flag
    this.option('skip-demo', {
      description: 'Skip generation of demo application',
      type: Boolean,
      defaults: false
    });

    // This adds support for a `--npm` flag
    this.option('npm', {
      description: 'Use npm instead of yarn',
      type: Boolean,
      defaults: false
    });


    this.skipChecks = this.options.skipChecks;
    this.skipInstall = this.options.skipInstall;
    this.skipStyles = this.options.skipStyles;
    this.skipDemo = this.options.skipDemo;
    this.skipCache = this.options.skipCache;
    this.useYarn = !this.options.npm;

    /**
       * Print a error message.
       *
       * @param {string} value - message to print
       */
    this.error = msg => {
      this.log(`${chalk.red.bold('ERROR!')}\n${chalk.red(msg)}`);
    };

    /**
       * Print a warning message.
       *
       * @param {string} value - message to print
       */
    this.warning = msg => {
      this.log(`${chalk.yellow.bold('WARNING!')}\n${chalk.yellow(msg)}`);
    };

    /**
     *  Check if yarn is installed
     */
    this.checkYarn = () => {
      if (this.skipChecks || !this.useYarn) {
        return;
      }
      const done = this.async();
      exec('yarn --version', err => {
        if (err) {
          this.warning('yarn is not found on your computer.\n',
            ' Using npm instead');
          this.useYarn = false;
        } else {
          this.useYarn = true;
        }
        done();
      });
    };

    /**
     *  Check if yarn is installed
     */
    this.checkAngularCLI = () => {
      if (this.skipChecks) {
        return;
      }
      const done = this.async();
      exec('ng --version', err => {
        if (err) {
          this.warning('@angular/cli is not found on your computer.\n');
        }
        done();
      });
    };
  }

  initializing() {
    this.pkg = require('../package.json');
    this.checkYarn();
    this.checkAngularCLI();
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the wondrous ${chalk.green('ngx-library')} generator!`
    ));

    let info = {
      git: {
        name: this.user.git.name(),
        email: this.user.git.email()
      }
    };

    let done = this.async();
    let init = () => {
      this.moduleClass = `${_.upperFirst(_.camelCase(this.moduleName))}Module`;
      this.demoProjectPageClass = `${_.upperFirst(_.camelCase(this.projectName))}DemoPage`;
      this.today = new Date();

      //set up ng dependencies
      this.ngDependencies = [];
      for (let ngModule of this.ngModules) {
        this.ngDependencies.push(`"@angular/${ngModule}": "${(ngModule === 'router' && this.ngVersion === '2.0.0') ? '3.0.0' : this.ngVersion}"`);
      }

      //set up  ng dev dependencies
      this.ngDevDependencies = [];
      if (this.ngModules.indexOf('compiler') === -1) {
        this.ngDevDependencies.push(`"@angular/compiler" : "${this.ngVersion}"`);
      }

      if (this.ngModules.indexOf('platform-server') === -1) {
        this.ngDevDependencies.push(`"@angular/platform-server" : "${this.ngVersion}"`);
      }

      if (this.ngModules.indexOf('platform-browser') === -1) {
        this.ngDevDependencies.push(`"@angular/platform-browser" : "${this.ngVersion}"`);
      }

      if (this.ngModules.indexOf('platform-browser-dynamic') === -1) {
        this.ngDevDependencies.push(`"@angular/platform-browser-dynamic" : "${this.ngVersion}"`);
      }

      if (this.ngVersion === '2.0.0') {
        this.ngDevDependencies.push('"@angular/compiler-cli" : "0.6.2"');
        this.ngDevDependencies.push('"zone.js" : "0.6.21"');
        this.ngDevDependencies.push('"rxjs" : "5.0.0-beta.12"');
        this.ngDevDependencies.push('"tslint" : "3.15.1"');
        this.ngDevDependencies.push('"gulp-tslint" : "6.1.1"'); // Because it depends on 'tslint'
        this.ngDevDependencies.push('"typescript" : "2.0.3"');
        this.ngDevDependencies.push('"codelyzer" : "1.0.0-beta.0"');
      } else {
        this.ngDevDependencies.push('"@angular/compiler-cli" : "4.0.0"');
        this.ngDevDependencies.push('"zone.js" : "0.8.4"');
        this.ngDevDependencies.push('"rxjs" : "5.0.1"');
        this.ngDevDependencies.push('"tslint" : "5.4.3"');
        this.ngDevDependencies.push('"gulp-tslint" : "8.1.1"'); // Because it depends on 'tslint'
        this.ngDevDependencies.push('"typescript" : "2.3.3"');
        this.ngDevDependencies.push('"codelyzer" : "3.1.1"');

        if (this.ngModules.indexOf('animations') === -1) {
          this.ngDevDependencies.push(`"@angular/animations" : "${this.ngVersion}"`);
        }
      }

      //greenkeeper exluded packages
      this.greenkeeperExclusions = [];
      if (this.useGreenkeeper) {
        let allDependencies = this.ngDependencies.concat(this.ngDevDependencies);
        let allDependenciesAsJsonText = `{${allDependencies.join(',\n')}}`;
        this.greenkeeperExclusions = _.keys(JSON.parse(allDependenciesAsJsonText)).map(p => `"${p}"`);
      }
    };

    this.authorName = this.config.get('authorName');
    this.authorEmail = this.config.get('authorEmail');
    this.githubUsername = this.config.get('githubUsername');
    this.projectName = this.config.get('projectName');
    this.projectVersion = this.config.get('projectVersion');
    this.projectDescription = this.config.get('projectDescription');
    this.projectKeywords = this.config.get('projectKeywords');
    this.moduleName = this.config.get('moduleName');
    this.ngVersion = this.config.get('ngVersion');
    this.ngModules = this.config.get('ngModules');
    this.useGreenkeeper = this.config.get('useGreenkeeper');
    this.useCompodoc = this.config.get('useCompodoc');

    if (this.fs.exists('.yo-rc.json') && !this.skipCache) {
      this.log(chalk.green('This is an existing project, using the configuration from your .yo-rc.json file to re-generate it...\n'));
      init();
      done();
    } else {
      this.prompt(prompts(info)).then(props => {
        this.authorName = props.authorName;
        this.authorEmail = props.authorEmail;
        this.githubUsername = props.githubUsername;
        this.projectName = props.projectName;
        this.projectVersion = props.projectVersion;
        this.projectDescription = props.projectDescription;
        this.projectKeywords = props.projectKeywords ? props.projectKeywords.split(',') : [];
        this.moduleName = props.moduleName;
        this.ngVersion = props.ngVersion;
        this.ngModules = props.ngModules;
        this.useGreenkeeper = props.useGreenkeeper;
        this.useCompodoc = props.useCompodoc;

        // Filter ngModules
        if (this.ngVersion === '2.0.0' && this.ngModules.indexOf('animations') !== -1) {
          this.warning(`Module 'animations' is only available for angular v4+. Removing it.`);
          _.remove(this.ngModules, ngModule => ngModule === 'animations');
        }

        init();

        // Save config
        this.config.set('authorName', this.authorName);
        this.config.set('authorEmail', this.authorEmail);
        this.config.set('githubUsername', this.githubUsername);
        this.config.set('projectName', this.projectName);
        this.config.set('projectVersion', this.projectVersion);
        this.config.set('projectDescription', this.projectDescription);
        this.config.set('projectKeywords', this.projectKeywords);
        this.config.set('moduleName', this.moduleName);
        this.config.set('ngVersion', this.ngVersion);
        this.config.set('ngModules', this.ngModules);
        this.config.set('useGreenkeeper', this.useGreenkeeper);
        this.config.set('useCompodoc', this.useCompodoc);

        done();
      });
    }
  }

  writing() {
    // Create project
    this.fs.copyTpl(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'), this);
    this.fs.copyTpl(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'), this);
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this);
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), this);
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('travis.yml'), this.destinationPath('.travis.yml'));

    this.fs.copy(this.templatePath('CHANGELOG.md'), this.destinationPath('CHANGELOG.md'));
    this.fs.copy(this.templatePath('karma.conf.js'), this.destinationPath('karma.conf.js'));
    this.fs.copyTpl(this.templatePath('_tsconfig-aot.json'), this.destinationPath('tsconfig-aot.json'), this);
    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copyTpl(this.templatePath('_tslint.json'), this.destinationPath('tslint.json'), this);
    this.fs.copy(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));

    // Create Source files
    this.fs.copyTpl(this.templatePath('src/_index.ts'), this.destinationPath('src/index.ts'), this);
    this.fs.copyTpl(this.templatePath('src/_moduleName.module.ts'), this.destinationPath(`src/${this.moduleName}.module.ts`), this);

    if (!this.skipDemo) {
      // Create Demo files
      this.fs.copyTpl(this.templatePath('demo/e2e/_app.e2e-spec.ts'), this.destinationPath('demo/e2e/app.e2e-spec.ts'), this);
      this.fs.copyTpl(this.templatePath('demo/e2e/_app.po.ts'), this.destinationPath('demo/e2e/app.po.ts'), this);
      this.fs.copy(this.templatePath('demo/e2e/tsconfig.e2e.json'), this.destinationPath('demo/e2e/tsconfig.e2e.json'));
      this.fs.copyTpl(this.templatePath('demo/src/app/getting-started/_getting-started.component.ts'), this.destinationPath('demo/src/app/getting-started/getting-started.component.ts'), this);
      this.fs.copy(this.templatePath('demo/src/app/getting-started/getting-started.component.html'), this.destinationPath('demo/src/app/getting-started/getting-started.component.html'));
      this.fs.copy(this.templatePath('demo/src/app/getting-started/getting-started.component.scss'), this.destinationPath('demo/src/app/getting-started/getting-started.component.scss'));
      this.fs.copy(this.templatePath('demo/src/app/getting-started/getting-started.component.spec.ts'), this.destinationPath('demo/src/app/getting-started/getting-started.component.spec.ts'));
      this.fs.copyTpl(this.templatePath('demo/src/app/home/_home.component.html'), this.destinationPath('demo/src/app/home/home.component.html'), this);
      this.fs.copyTpl(this.templatePath('demo/src/app/home/_home.component.ts'), this.destinationPath('demo/src/app/home/home.component.ts'), this);
      this.fs.copyTpl(this.templatePath('demo/src/app/home/_home.component.spec.ts'), this.destinationPath('demo/src/app/home/home.component.spec.ts'), this);
      this.fs.copy(this.templatePath('demo/src/app/home/home.component.scss'), this.destinationPath('demo/src/app/home/home.component.scss'));
      this.fs.copy(this.templatePath('demo/src/app/shared/content-wrapper/content-wrapper.component.ts'), this.destinationPath('demo/src/app/shared/content-wrapper/content-wrapper.component.ts'));
      this.fs.copy(this.templatePath('demo/src/app/shared/content-wrapper/content-wrapper.component.html'), this.destinationPath('demo/src/app/shared/content-wrapper/content-wrapper.component.html'));
      this.fs.copy(this.templatePath('demo/src/app/shared/content-wrapper/content-wrapper.component.scss'), this.destinationPath('demo/src/app/shared/content-wrapper/content-wrapper.component.scss'));
      this.fs.copy(this.templatePath('demo/src/app/shared/content-wrapper/content-wrapper.component.spec.ts'), this.destinationPath('demo/src/app/shared/content-wrapper/content-wrapper.component.spec.ts'));
      this.fs.copyTpl(this.templatePath('demo/src/app/shared/footer/_footer.component.html'), this.destinationPath('demo/src/app/shared/footer/footer.component.html'), this);
      this.fs.copy(this.templatePath('demo/src/app/shared/footer/footer.component.scss'), this.destinationPath('demo/src/app/shared/footer/footer.component.scss'));
      this.fs.copy(this.templatePath('demo/src/app/shared/footer/footer.component.spec.ts'), this.destinationPath('demo/src/app/shared/footer/footer.component.spec.ts'));
      this.fs.copy(this.templatePath('demo/src/app/shared/footer/footer.component.ts'), this.destinationPath('demo/src/app/shared/footer/footer.component.ts'));
      this.fs.copyTpl(this.templatePath('demo/src/app/shared/header/_header.component.html'), this.destinationPath('demo/src/app/shared/header/header.component.html'), this);
      this.fs.copyTpl(this.templatePath('demo/src/app/shared/header/_header.component.spec.ts'), this.destinationPath('demo/src/app/shared/header/header.component.spec.ts'), this);
      this.fs.copy(this.templatePath('demo/src/app/shared/header/header.component.scss'), this.destinationPath('demo/src/app/shared/header/header.component.scss'));
      this.fs.copy(this.templatePath('demo/src/app/shared/header/header.component.ts'), this.destinationPath('demo/src/app/shared/header/header.component.ts'));
      this.fs.copy(this.templatePath('demo/src/app/shared/index.ts'), this.destinationPath('demo/src/app/shared/index.ts'));
      this.fs.copy(this.templatePath('demo/src/app/shared/shared.module.ts'), this.destinationPath('demo/src/app/shared/shared.module.ts'));
      this.fs.copyTpl(this.templatePath('demo/src/app/_app.component.spec.ts'), this.destinationPath('demo/src/app/app.component.spec.ts'), this);
      this.fs.copy(this.templatePath('demo/src/app/app-routing.ts'), this.destinationPath('demo/src/app/app-routing.ts'));
      this.fs.copy(this.templatePath('demo/src/app/app.component.html'), this.destinationPath('demo/src/app/app.component.html'));
      this.fs.copy(this.templatePath('demo/src/app/app.component.scss'), this.destinationPath('demo/src/app/app.component.scss'));
      this.fs.copy(this.templatePath('demo/src/app/app.component.ts'), this.destinationPath('demo/src/app/app.component.ts'));
      this.fs.copy(this.templatePath('demo/src/app/app.module.ts'), this.destinationPath('demo/src/app/app.module.ts'));
      this.fs.copy(this.templatePath('demo/src/assets/gitkeep'), this.destinationPath('demo/src/assets/.gitkeep'));
      this.fs.copy(this.templatePath('demo/src/assets/npmignore'), this.destinationPath('demo/src/assets/.npmignore'));
      this.fs.copy(this.templatePath('demo/src/assets/logo.svg'), this.destinationPath('demo/src/assets/logo.svg'));
      this.fs.copy(this.templatePath('demo/src/environments/environment.prod.ts'), this.destinationPath('demo/src/environments/environment.prod.ts'));
      this.fs.copy(this.templatePath('demo/src/environments/environment.ts'), this.destinationPath('demo/src/environments/environment.ts'));
      this.fs.copyTpl(this.templatePath('demo/src/_index.html'), this.destinationPath('demo/src/index.html'), this);
      this.fs.copy(this.templatePath('demo/src/_variables.scss'), this.destinationPath('demo/src/_variables.scss'));
      this.fs.copy(this.templatePath('demo/src/favicon.ico'), this.destinationPath('demo/src/favicon.ico'));
      this.fs.copy(this.templatePath('demo/src/favicon.ico'), this.destinationPath('demo/src/favicon.ico'));
      this.fs.copy(this.templatePath('demo/src/main.ts'), this.destinationPath('demo/src/main.ts'));
      this.fs.copy(this.templatePath('demo/src/polyfills.ts'), this.destinationPath('demo/src/polyfills.ts'));
      this.fs.copy(this.templatePath('demo/src/styles.scss'), this.destinationPath('demo/src/styles.scss'));
      this.fs.copy(this.templatePath('demo/src/test.ts'), this.destinationPath('demo/src/test.ts'));
      this.fs.copy(this.templatePath('demo/src/tsconfig.app.json'), this.destinationPath('demo/src/tsconfig.app.json'));
      this.fs.copy(this.templatePath('demo/src/tsconfig.spec.json'), this.destinationPath('demo/src/tsconfig.spec.json'));
      this.fs.copy(this.templatePath('demo/src/typings.d.ts'), this.destinationPath('demo/src/typings.d.ts'));
      this.fs.copyTpl(this.templatePath('demo/_angular-cli.json'), this.destinationPath('demo/.angular-cli.json'), this);
      this.fs.copyTpl(this.templatePath('demo/_package.json'), this.destinationPath('demo/package.json'), this);
      this.fs.copyTpl(this.templatePath('demo/_README.md'), this.destinationPath('demo/README.md'), this);
      this.fs.copy(this.templatePath('demo/editorconfig'), this.destinationPath('demo/.editorconfig'));
      this.fs.copy(this.templatePath('demo/gitignore'), this.destinationPath('demo/.gitignore'));
      this.fs.copy(this.templatePath('demo/karma.conf.js'), this.destinationPath('demo/karma.conf.js'));
      this.fs.copy(this.templatePath('demo/protractor.conf.js'), this.destinationPath('demo/protractor.conf.js'));
      if (this.useCompodoc) {
        this.fs.copy(this.templatePath('demo/proxy.conf.json'), this.destinationPath('demo/proxy.conf.json'));
      }
      this.fs.copy(this.templatePath('demo/tsconfig.json'), this.destinationPath('demo/tsconfig.json'));
      this.fs.copy(this.templatePath('demo/tslint.json'), this.destinationPath('demo/tslint.json'));
    }
    // Create Git files
    this.fs.copyTpl(this.templatePath('git/_config'), this.destinationPath('.git/config'), this);
    this.fs.copy(this.templatePath('git/description'), this.destinationPath('.git/description'));
    this.fs.copy(this.templatePath('git/HEAD'), this.destinationPath('.git/HEAD'));
    this.fs.copy(this.templatePath('git/hooks/*.sample'), this.destinationPath('.git/hooks/'));
    this.fs.copy(this.templatePath('git/info/exclude'), this.destinationPath('.git/info/exclude'));

    // Create Github files
    this.fs.copy(this.templatePath('github/ISSUE_TEMPLATE.md'), this.destinationPath('.github/ISSUE_TEMPLATE.md'));

    // Create config files
    this.fs.copy(this.templatePath('config/helpers.js'), this.destinationPath('config/helpers.js'));
    this.fs.copy(this.templatePath('config/karma-test-shim.js'), this.destinationPath('config/karma-test-shim.js'));
    this.fs.copy(this.templatePath('config/karma.conf.js'), this.destinationPath('config/karma.conf.js'));
    this.fs.copy(this.templatePath('config/webpack.test.js'), this.destinationPath('config/webpack.test.js'));
    this.fs.copy(this.templatePath('config/gulp-tasks/README.md'), this.destinationPath('config/gulp-tasks/README.md'));

    // Empty folders are not created by 'mem-fs-editor' by default
    mkdirp('.git/objects/info');
    mkdirp('.git/objects/pack');
    mkdirp('.git/refs/heads');
    mkdirp('.git/refs/tags');
  }

  install() {
    let installationDone = () => {
      this.log(`\nAlmost done (2/3). Running ${chalk.green('gulp package')} to prepare your library package in dist/...`);
      this.spawnCommand('gulp', ['package'])
        .on('exit', code => {
          if (code === 0) {
            this.log(`\nAlmost done (3/3). Running ${chalk.green('gulp link')} to npm-link to locally built package in dist/...`);
            this.spawnCommand('gulp', ['link'])
              .on('exit', code => {
                if (code === 0) {
                  this.log(yosay('All done, happy ng-hacking :)!'));
                } else {
                  this.error(`[gulp link] Failed to link the library...`);
                }
              });
          } else {
            this.error(`[gulp package] Failed to package the library...`);
          }
        });
    };

    if (this.skipInstall) {
      this.warning(
        'You chose to skip automatic installation of dependencies. That\'s fine!\n' +
        'But remember to run these commands once you are done installing them yourself:\n' +
        `  1. ${chalk.green.bold('gulp build')} (requires every time you want to update your package in dist/ folder)\n` +
        `  2. ${chalk.green.bold('gulp link')}  (requires only once for demo app, to link to your local package in dist/\n`);

      this.log(yosay('All done, happy ng-hacking :)!'));
    } else {
      this.log(`\n\nAlmost done (1/3). Running ${this.useYarn ? chalk.green('yarn install') : chalk.green('npm install')} to install the required dependencies.`);
      this.installDependencies({
        bower: false,
        npm: !this.useYarn,
        yarn: this.useYarn,
        skipMessage: true,
        callback: installationDone
      });
    }
  }
};
