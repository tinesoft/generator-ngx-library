'use strict';

const validators = require('./validators');

const NG_MODULES = [
  {name: 'core', checked: true},
  {name: 'common', checked: true},
  'forms',
  'http',
  'compiler',
  'router',
  'upgrade',
  'language-service',
  'platform-browser-dynamic',
  'platform-browser',
  'platform-server',
  'platform-webworker-dynamic',
  'platform-webworker',
  {name: 'animations (angular 4+ only)', value: 'animations'}
];

module.exports = info => {
  return [
    {
      type: 'input',
      name: 'authorName',
      validate: validators.validateAuthorName,
      message: '(1/13) What is your name?',
      default: info.git.name
    },
    {
      type: 'input',
      name: 'authorEmail',
      validate: validators.validateAuthorEmail,
      message: '(2/13) What is your email address?',
      default: info.git.email
    },
    {
      type: 'input',
      name: 'githubUsername',
      validate: validators.validateGithubUsername,
      message: '(3/13) What is your Github username?'
    },
    {
      type: 'input',
      name: 'projectName',
      validate: validators.validateProjectName,
      message: '(4/13) What is the name of your project?',
      default: 'my-ngx-library'
    },
    {
      type: 'input',
      name: 'projectVersion',
      validate: validators.validateProjectVersion,
      message: '(5/13) What is the version of your project?',
      default: '0.0.1'
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: '(6/13) What is the description of your project?',
      default: 'Angular library built with ❤ using ngx-library yeoman generator.'
    },
    {
      type: 'input',
      name: 'projectKeywords',
      message: '(7/13) What keywords best describe your project (comma-separated)?'
    },
    {
      type: 'input',
      name: 'ngPrefix',
      validate: validators.validateNgPrefix,
      message: '(8/13) What prefix would you like to use to name your components, directives,...?',
      default: 'my-lib'
    },
    {
      type: 'input',
      name: 'moduleName',
      validate: validators.validateModuleName,
      message: '(9/13) What is the name of your main Angular module?',
      default: 'my-ng-module'
    },
    {
      type: 'list',
      name: 'ngVersion',
      message: '(10/13) What minimal version of Angular do you want to base your library upon?',
      choices: [
        {name: '2.X.X', value: '2.0.0'},
        {name: '4.X.X', value: '4.0.0'}],
      default: 0
    },
    {
      type: 'checkbox',
      name: 'ngModules',
      validate: validators.validateNgModules,
      message: '(11/13) What Angular modules will your library use?',
      choices: NG_MODULES
    },
    {
      type: 'confirm',
      name: 'useGreenkeeper',
      message: '(12/13) Do You want to use Greenkeepeer (to automatically keep your dependencies up-to-date)?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useCompodoc',
      message: '(13/13) Do You want to use Compodoc (to generate your Angular project documentation)?',
      default: false
    }
  ];
};
