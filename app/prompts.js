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
      message: '(1/16) What is your name?',
      default: info.git.name
    },
    {
      type: 'input',
      name: 'authorEmail',
      validate: validators.validateAuthorEmail,
      message: '(2/16) What is your email address?',
      default: info.git.email
    },
    {
      type: 'input',
      name: 'githubUsername',
      validate: validators.validateGithubUsername,
      message: '(3/16) What is your Github username?'
    },
    {
      type: 'input',
      name: 'githubRepoName',
      validate: validators.validateGithubRepoName,
      message: '(4/16) What is your Github repository name?'
    },
    {
      type: 'input',
      name: 'projectName',
      validate: validators.validateProjectName,
      message: '(5/16) What is the name of your project?',
      default: 'my-ngx-library'
    },
    {
      type: 'input',
      name: 'projectVersion',
      validate: validators.validateProjectVersion,
      message: '(6/16) What is the version of your project?',
      default: '0.0.1'
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: '(7/16) What is the description of your project?',
      default: 'Angular library built with ❤ using ngx-library yeoman generator.'
    },
    {
      type: 'input',
      name: 'projectKeywords',
      message: '(8/16) What keywords best describe your project (comma-separated)?',
      default: 'ng,angular,library'
    },
    {
      type: 'list',
      name: 'ngVersion',
      message: '(9/16) What minimal version of Angular do you want to base your library upon?',
      choices: [
        {name: '2.X.X', value: '2.0.0'},
        {name: '4.X.X', value: '4.0.0'},
        {name: '5.X.X', value: '5.0.0'}],
      default: 0
    },
    {
      type: 'checkbox',
      name: 'ngModules',
      validate: validators.validateNgModules,
      message: '(10/16) What Angular modules will your library use?',
      choices: NG_MODULES
    },
    {
      type: 'input',
      name: 'otherDependencies',
      message: '(11/16) What other NPM packages your project depends upon? (comma-separated)?',
      default: ''
    },
    {
      type: 'input',
      name: 'ngPrefix',
      validate: validators.validateNgPrefix,
      message: '(12/16) What prefix would you like to use to name your components, directives,...?',
      default: 'my-lib'
    },
    {
      type: 'list',
      name: 'testingFramework',
      message: '(13/16) What testing framework do you want to use?',
      choices: [
        {name: 'Karma', value: 'karma'},
        {name: 'Jest', value: 'jest'}],
      default: 0
    },
    {
      type: 'confirm',
      name: 'useGreenkeeper',
      message: '(14/16) Do You want to use Greenkeepeer (to automatically keep your dependencies up-to-date)?',
      default: false
    },
    {
      type: 'confirm',
      name: 'useCompodoc',
      message: '(15/16) Do You want to use Compodoc (to generate your Angular project documentation)?',
      default: false
    },
    {
      type: 'confirm',
      name: 'enforceNgGitCommitMsg',
      message: '(16/16) Do You want to enforce Angular Git Commit Messages Guideline (to autogenerate CHANGELOG.md file)?',
      default: true
    }
  ];
};
