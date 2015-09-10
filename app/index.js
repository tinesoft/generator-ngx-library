'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wondrous ' + chalk.red('ng-plugin') + ' generator!'
    ));

    var prompts = [
      {
          type: 'input',
          name: 'authorName',
          validate: function (input) {
             return (/^([a-zA-Z0-9 -_]*)$/.test(input)) ? true : 'Your author name cannot be empty';
          },
          message: '(1/10) What is your name?',
          default: 'Tine Kondo'
      },
      {
          type: 'input',
          name: 'githubUsername',
          validate: function (input) {
             return (/^([a-zA-Z0-9]*)$/.test(input)) ? true : 'Your github username cannot contain special characters or a blank space, using the default name instead';
          },
          message: '(2/10) What is your Github username?',
          default: 'tinesoft'
      },
      {
          type: 'input',
          name: 'projectName',
          validate: function (input) {
             return (/^([a-zA-Z0-9-_]*)$/.test(input)) ? true : 'Your project name cannot contain special characters or a blank space, using the default name instead';
          },
          message: '(3/10) What is the base name of your project?',
          default: 'ng-plugin'
      },
      {
          type: 'input',
          name: 'projectVersion',
          validate: function (input) {
             return (/^([0-9]\.[0-9]\.[0-9])$/.test(input)) ? true : 'Your project version does not follow semantic versioning convention (eg: X.Y.Z)';
          },
          message: '(4/10) What is the version of your project?',
          default: '1.0.0'
      },
      {
          type: 'input',
          name: 'projectDescription',
          message: '(5/10) What is the description of your project?',
          default: 'AngularJS plugin for ...'
      },
      /*{
          type: 'confirm',
          name: 'keywordAdd',
          message: '(6/10) Do you want to add keywords to describe your project?',
          default: true
      },
      {
          when: function (response) {
              return response.keywordAdd == true;
          },
          type: 'input',
          name: 'projectKeyword',
          validate: function (input) {
              if (!(/^([a-zA-Z0-9_]*)$/.test(input))) {
                  return 'Your project\'s keyword  cannot contain special characters';
              } else if (input == '') {
                  return 'Your project\'s keyword  cannot be empty';
              }
              return true;
          },
          message: 'Enter a keyword that best descibes your project'
      },*/
      {
          type: 'input',
          name: 'angularVersion',
          validate: function (input) {
              return (input !== '') ? true : 'Your Angular JS version cannot be empty';
          },
          message: '(7/10) Which version of Angular JS do you want to use for your project?',
          default: '>=1.0.8'
      },
      {
          type: 'input',
          name: 'ngModuleName',
          validate: function (input) {
              return (/^([a-zA-Z0-9-_]*)$/.test(input)) ? true : 'Your Angular module name cannot contain special characters or a blank space, using the default name instead';
          },
          message: '(8/10) What is the name of your Angular module?',
          default: 'ngModule'
      },
      {
          type: 'input',
          name: 'ngDirectiveName',
          validate: function (input) {
              return (/^([a-z-]*)$/.test(input)) ? true : 'Your directive name cannot contain special characters or a blank space, using the default name instead';
          },
          message: '(9/10) What is the name of your main directive?',
          default: 'directive-name'
      },
      {
          type: 'input',
          name: 'mainColor',
          validate: function (input) {
              return (input !== '') ? true : 'Your brand color cannot be empty';
          },
          message: '(10/10) What is the brand color (for the demo app)?',
          default: '#f75b00'
      }
    ];

    this.authorName = this.config.get('authorName');
    this.githubUsername = this.config.get('githubUsername');
    this.projectName = this.config.get('projectName');
    this.projectVersion = this.config.get('projectVersion');
    this.projectDescription = this.config.get('projectDescription');
    this.projectKeywords = [];//FIXME
    this.angularVersion = this.config.get('angularVersion');
    this.ngModuleName = this.config.get('ngModuleName');
    this.ngDirectiveName = this.config.get('ngDirectiveName');
    this.mainColor = this.config.get('mainColor');

    
    if (!!this.authorName &&
        !!this.githubUsername &&
        !!this.projectName &&
        !!this.projectVersion &&
        !!this.projectDescription &&
        !!this.angularVersion &&
        !!this.ngModuleName &&
        !!this.ngDirectiveName &&
        !!this.mainColor) {


        this.log(chalk.green('This is an existing project, using the configuration from your .yo-rc.json file \n' +
            'to re-generate the project...\n'));

        done();
    } else {
        this.prompt(prompts, function (props) {
            this.authorName = props.authorName;
            this.githubUsername = props.githubUsername;
            this.projectName = props.projectName;
            this.projectVersion = props.projectVersion;
            this.projectDescription = props.projectDescription;
            this.angularVersion = props.angularVersion;
            this.ngModuleName = props.ngModuleName;
            this.ngDirectiveName = props.ngDirectiveName;
            this.mainColor = props.mainColor;

            done();
        }.bind(this));
    }
  },

  writing: {
    app: function () {
      // Remove old files

      // Create project
      this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this);
      this.fs.copyTpl(this.templatePath('_bower.json'), this.destinationPath('bower.json'), this);
      this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), this);
      this.fs.copyTpl(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'),this);
      this.fs.copyTpl(this.templatePath('_Gruntfile.js'), this.destinationPath('Gruntfile.js'), this);
      this.fs.copy(this.templatePath('bowerrc'), this.destinationPath('.bowerrc'));
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
      this.fs.copy(this.templatePath('travis.yml'), this.destinationPath('.travis.yml'));
      this.fs.copy(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'));

      this.fs.copy(this.templatePath('build.config.js'), this.destinationPath('build.config.js'));
      this.fs.copy(this.templatePath('CHANGELOG.md'), this.destinationPath('CHANGELOG.md'));
      this.fs.copy(this.templatePath('changelog.tpl'), this.destinationPath('changelog.tpl'));
      this.fs.copy(this.templatePath('karma-unit.tpl.js'), this.destinationPath('karma-unit.tpl.js'));
      this.fs.copy(this.templatePath('module.prefix'), this.destinationPath('module.prefix'));
      this.fs.copy(this.templatePath('module.suffix'), this.destinationPath('module.suffix'));

      // Create Source files
      this.fs.copyTpl(this.templatePath('src/_projectName.js'), this.destinationPath('src/'+ this.projectName + '.js'), this);
      this.fs.copyTpl(this.templatePath('src/_projectName.spec.js'), this.destinationPath('src/'+ this.projectName + '.spec.js'), this);
      this.fs.copyTpl(this.templatePath('src/_projectName.tpl.html'), this.destinationPath('src/'+ this.projectName + '.tpl.html'), this);
      this.fs.copyTpl(this.templatePath('src/_projectName.less'), this.destinationPath('src/'+ this.projectName + '.less'), this);

      // Create Demo files
      this.fs.copyTpl(this.templatePath('demo/_index.html'), this.destinationPath('demo/index.html'), this);
      this.fs.copyTpl(this.templatePath('demo/app/_app.js'), this.destinationPath('demo/app/app.js'), this);
      this.fs.copyTpl(this.templatePath('demo/less/_demo.less'), this.destinationPath('demo/less/demo.less'), this);
      this.fs.copyTpl(this.templatePath('demo/app/helpers/_plunker.js'), this.destinationPath('demo/app/helpers/plunker.js'), this);
      this.fs.copy(this.templatePath('demo/app/helpers/prettifyDirective.js'), this.destinationPath('demo/app/helpers/prettifyDirective.js'));

      // Create Git files
      this.fs.copyTpl(this.templatePath('git/_config'), this.destinationPath('.git/config'), this);
      this.fs.copy(this.templatePath('git/description'), this.destinationPath('.git/description'));
      this.fs.copy(this.templatePath('git/HEAD'), this.destinationPath('.git/HEAD'));
      this.fs.copy(this.templatePath('git/hooks/*.sample'), this.destinationPath('.git/hooks/'));
      this.fs.copy(this.templatePath('git/info/exclude'), this.destinationPath('.git/info/exclude'));
      //empty folders are not created by 'mem-fs-editor' by default
      mkdirp('.git/objects/info');
      mkdirp('.git/objects/pack');
      mkdirp('.git/refs/heads');
      mkdirp('.git/refs/tags');

      //save config
      this.config.set('authorName', this.authorName);
      this.config.set('githubUsername', this.githubUsername);
      this.config.set('projectName', this.projectName);
      this.config.set('projectVersion', this.projectVersion);
      this.config.set('projectDescription', this.projectDescription);
      //FIXME this.projectKeywords = [];
      this.config.set('angularVersion', this.angularVersion);
      this.config.set('ngModuleName', this.ngModuleName);
      this.config.set('ngDirectiveName', this.ngDirectiveName);
      this.config.set('mainColor', this.mainColor);

    },

    projectfiles: function () {
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
      this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'));
    }
  },

  install: function () {
    this.installDependencies();
  }
});
