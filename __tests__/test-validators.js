'use strict';

const validators = require('../app/validators');
const assert = require('yeoman-assert');

describe('ngx-library:validators', () => {
  it('should validate "authorName"', () => {
    assert.strictEqual(!validators.validateAuthorName(''), false, 'empty string should fail validation');
    assert.strictEqual(!validators.validateAuthorName(), false, 'not passing a value should fail validation');
    assert.strictEqual(!validators.validateAuthorName('My / Name'), false, 'not passing a valid value should fail validation');
    assert.strictEqual(validators.validateAuthorName('name'), true, 'passing a valid value passes validation');
  });

  it('should validate "authorEmail"', () => {
    assert.strictEqual(!validators.validateAuthorEmail(''), false, 'empty string should fail validation');
    assert.strictEqual(!validators.validateAuthorEmail(), false, 'not passing a value should fail validation');
    assert.strictEqual(!validators.validateAuthorEmail('name@domain'), false, 'not passing a valid value should fail validation');
    assert.strictEqual(validators.validateAuthorEmail('name@domain.com'), true, 'passing a valid value passes validation');
  });

  it('should validate "githubUsername"', () => {
    assert.strictEqual(!validators.validateGithubUsername(''), false, 'empty string should fail validation');
    assert.strictEqual(!validators.validateGithubUsername(), false, 'not passing a value should fail validation');
    assert.strictEqual(!validators.validateGithubUsername('My_/_Name'), false, 'not passing a valid value should fail validation');
    assert.strictEqual(validators.validateGithubUsername('user007'), true, 'passing a valid value passes validation');
  });

  it('should validate "githubRepoName"', () => {
    assert.strictEqual(!validators.validateGithubRepoName(''), false, 'empty string should fail validation');
    assert.strictEqual(!validators.validateGithubRepoName(), false, 'not passing a value should fail validation');
    assert.strictEqual(!validators.validateGithubRepoName('My_/_PorjectName'), false, 'not passing a valid value should fail validation');
    assert.strictEqual(validators.validateGithubRepoName('my-ngx-library'), true, 'passing a valid value passes validation');
  });

  it('should validate "projectName"', () => {
    assert.strictEqual(!validators.validateProjectName(''), false, 'empty string should fail validation');
    assert.strictEqual(!validators.validateProjectName(), false, 'not passing a value should fail validation');
    assert.strictEqual(!validators.validateProjectName('My_/_PorjectName'), false, 'not passing a valid value should fail validation');
    assert.strictEqual(validators.validateProjectName('my-ngx-library'), true, 'passing a valid value passes validation');
    assert.strictEqual(validators.validateProjectName('@my-scope/my-ngx-library'), true, 'passing a valid "scoped package" value passes validation');
  });

  it('should validate "projectVersion"', () => {
    assert.strictEqual(!validators.validateProjectVersion(''), false, 'empty string should fail validation');
    assert.strictEqual(!validators.validateProjectVersion(), false, 'not passing a value should fail validation');
    assert.strictEqual(!validators.validateProjectVersion('1.2'), false, 'passing a valid value should fail validation');
    assert.strictEqual(validators.validateProjectVersion('1.2.0'), true, 'passing a valid value passes validation');
  });

  it('should validate "ngPrefix"', () => {
    assert.strictEqual(!validators.validateNgPrefix(''), false, 'empty string should fail validation');
    assert.strictEqual(!validators.validateNgPrefix(), false, 'not passing a value should fail validation');
    assert.strictEqual(!validators.validateNgPrefix('My_/_NgPrefix'), false, 'not passing a valid value should fail validation');
    assert.strictEqual(validators.validateNgPrefix('my-lib'), true, 'passing a valid value passes validation');
  });

  it('should validate "ngModules"', () => {
    assert.strictEqual(!validators.validateNgModules([]), false, 'empty modules list should fail validation');
    assert.strictEqual(!validators.validateNgModules(['core', 'http']), false, 'incomplete modules list should fail validation');
    assert.strictEqual(validators.validateNgModules(['core', 'common']), true, 'passing a valid/complete modules list passes validation');
  });
});
