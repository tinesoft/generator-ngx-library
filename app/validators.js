'use strict';

const semver = require('semver');
const _ = require('lodash');

const NG_MODULES_DEPENDENCIES = {
  'animations': ['core'],
  'bazel': ['compiler-cli'],
  'common': ['core'],
  'compiler-cli': ['compiler'],
  'compiler': ['core'],
  'core': ['rxjs', 'zone.js'],
  'elements': ['core', 'platform-browser', 'rxjs'],
  'forms': ['core', 'common'],
  'http': ['core', 'platform-browser', 'rxjs'],
  'language-service': [],
  'platform-browser-dynamic': ['core', 'common', 'compiler', 'platform-browser'],
  'platform-browser': ['core', 'common'],
  'platform-server': ['core', 'common', 'compiler', 'platform-browser'],
  'platform-webworker-dynamic': ['core', 'compiler', 'platform-browser', 'platform-webworker'],
  'platform-webworker': ['core', 'platform-browser'],
  'router': ['core', 'common', 'platform-browser', 'rxjs'],
  'service-worker': ['core', 'common'],
  'upgrade': ['core', 'compiler', 'platform-browser', 'platform-browser-dynamic']
};

module.exports = {

  validateAuthorName: input => {
    return /^[a-zA-Z0-9 -_]+$/.test(input) ? true : 'Your author name is not valid';
  },

  validateAuthorEmail: input => {
    return /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,2}$/.test(input) ? true : 'Your author email is not valid';
  },

  validateGithubUsername: input => {
    return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(input) ? true : 'Your github username cannot contain special characters or a blank space';
  },

  validateGithubRepoName: input => {
    return /^[a-zA-Z0-9-_]+$/.test(input) ? true : 'Your github repository name cannot contain special characters or a blank space';
  },

  validateProjectName: input => {
    return /^([a-zA-Z0-9-_]+)|(@[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+)$/.test(input) ? true : 'Your project name cannot contain special characters or a blank space';
  },
  validateProjectVersion: input => {
    return semver.valid(input) ? true : 'Your project version does not follow semantic versioning convention (eg: X.Y.Z)';
  },
  validateNgPrefix: input => {
    return /^[a-zA-Z0-9-_]+$/.test(input) ? true : 'Your Angular prefix name cannot contain special characters or a blank space';
  },

  validateNgModules: selectedModules => {
    if (!selectedModules || selectedModules.indexOf('core') === -1) {
      return 'Your library must at least include Angular\'s "core" module';
    }

    let requiredModules = [...selectedModules];
    // Add all dependent modules by traversing through selected modules' dependencies
    for (let ngModule of selectedModules) {
      requiredModules = requiredModules.concat(NG_MODULES_DEPENDENCIES[ngModule]);
    }
    requiredModules = _.uniq(requiredModules);
    let missingModules = _.difference(requiredModules, selectedModules);
    // Remove dev dependencies
    _.remove(missingModules, m => m === 'rxjs' || m === 'zone.js');
    return missingModules.length === 0 ? true : `The following modules must be selected as well to satisfy dependencies: ${missingModules}`;
  }
};
