'use strict';
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const fancyLog = require('fancy-log');
const acolors = require('ansi-colors');
const PluginError = require('plugin-error');
const gulpShell = require('gulp-shell');
const execSync = require('child_process').execSync;

const jestCli = require('jest-cli');
const gulpEslint = require('gulp-eslint');
const gulpNsp = require('gulp-nsp');
const gulpPlumber = require('gulp-plumber');
const gulpCoveralls = require('gulp-coveralls');

//Bumping, Releasing tools
const gulpGit = require('gulp-git');
const gulpBump = require('gulp-bump');
const gulpConventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');

const runSequence = require('run-sequence');
const through = require('through2');
const toc = require('markdown-toc');

const yargs = require('yargs');
const argv = yargs
  .option('version', {
    alias: 'v',
    describe: 'Enter Version to bump to',
    choices: ['patch', 'minor', 'major'],
    type: 'string'
  })
  .option('ghToken', {
    alias: 'gh',
    describe: 'Enter Github Token for releasing',
    type: 'string'
  })
  .version(false) // disable default --version from yargs( since v9.0.0)
  .argv;

const getPackageJsonVersion = () => {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won't be updated
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

const isOK = condition => {
  return condition ? acolors.green('[OK]') : acolors.red('[KO]');
};

const readyToRelease = () => {
  let isTravisPassing = /build #\d+ passed/.test(execSync('npm run check-travis').toString().trim());
  let isAppveyorPassing = /AppVeyor build status: success/.test(execSync('npm run check-appveyor').toString().trim());
  let onMasterBranch = execSync('git symbolic-ref --short -q HEAD').toString().trim() === 'master';
  let canBump = !!argv.version;
  let canGhRelease = argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN;
  let canNpmPublish = !!execSync('npm whoami').toString().trim() && execSync('npm config get registry').toString().trim() === 'https://registry.npmjs.org/';

  fancyLog(`[travis-ci]      Travis build on 'master' branch is passing............................................${isOK(isTravisPassing)}`);
  fancyLog(`[appveyor-ci]    Appveyor build on 'master' branch is passing..........................................${isOK(isAppveyorPassing)}`);
  fancyLog(`[git-branch]     User is currently on 'master' branch..................................................${isOK(onMasterBranch)}`);
  fancyLog(`[npm-publish]    User is currently logged in to NPM Registry...........................................${isOK(canNpmPublish)}`);
  fancyLog(`[bump-version]   Option '--version' provided, with value : 'major', 'minor' or 'patch'.................${isOK(canBump)}`);
  fancyLog(`[github-release] Option '--ghToken' provided or 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' variable set......${isOK(canGhRelease)}`);

  return isTravisPassing && isAppveyorPassing && onMasterBranch && canBump && canGhRelease && canNpmPublish;
};


const tocfy = () => {
  return through.obj((file, encoding, cb) => {
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new PluginError('tocfy', 'Streaming not supported'));
    }
    if (!file.contents.length) {
      return cb(null, file);
    }
    let readme = fs.readFileSync(file.path, 'utf-8');
    file.contents = new Buffer(toc.insert(readme));
    cb(null, file);

  });
};

gulp.task('static', () => {
  return gulp.src(['app/*.js', 'tests/**/*.js'])
    .pipe(gulpPlumber())
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
});

gulp.task('nsp', cb => {
  gulpNsp({ package: path.resolve('package.json') }, cb);
});

gulp.task('toc', () => {
  return gulp.src('./README.md')
    .pipe(tocfy())
    .pipe(gulp.dest('./'));
});

gulp.task('test', cb => {
  let isTravis = !!process.env.TRAVIS;
  jestCli.runCLI({ config: require('./package.json').jest, coverage: true, runInBand: isTravis, ci: isTravis}, ".", function(result) {
    cb(result.success ? undefined: 'There are test failures!');
  });
});

// Watch changes on *.js files and test
gulp.task('test:watch', () => {
  jestCli.runCLI({ config: require('./package.json').jest, watch: true}, ".", function(result) {
    cb(result.success ? undefined: 'There are test failures!');
  });
});

gulp.task('coveralls', ['test'], () => {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(gulpCoveralls());
});


// Release Tasks
gulp.task('changelog', () => {
  return gulp.src('CHANGELOG.md', { buffer: false })
    .pipe(gulpPlumber())
    .pipe(gulpConventionalChangelog({ preset: 'angular', releaseCount: 0 }))
    .pipe(gulp.dest('./'));
});

gulp.task('github-release', (cb) => {
  if (!argv.ghToken && !process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN) {
    fancyLog(acolors.red(`You must specify a Github Token via '--ghToken' or set environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' to allow releasing on Github`));
    throw new Error(`Missing '--ghToken' argument and environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' not set`);
  }

  conventionalGithubReleaser(
    {
      type: 'oauth',
      token: argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
    },
    { preset: 'angular' },
    cb);
});

gulp.task('bump-version', () => {
  if (!argv.version) {
    fancyLog(acolors.red(`You must specify which version to bump to (Possible values: 'major', 'minor', and 'patch')`));
    throw new Error(`Missing '--version' argument`);
  }
  return gulp.src('./package.json')
    .pipe(gulpPlumber())
    .pipe(gulpBump({ type: argv.version }))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', () => {
  let version = getPackageJsonVersion();
  return gulp.src('.')
    .pipe(gulpPlumber())
    .pipe(gulpGit.add())
    .pipe(gulpGit.commit(`chore(release): bump version number to ${version}`));
});

gulp.task('push-changes', (cb) => {
  gulpGit.push('origin', 'master', cb);
});

gulp.task('create-new-tag', (cb) => {
  let version = `v${getPackageJsonVersion()}`;
  gulpGit.tag(version, `chore(release): :sparkles: :tada: create tag for version ${version}`, (error) => {
    if (error) {
      return cb(error);
    }
    gulpGit.push('origin', 'master', { args: '--tags' }, cb);
  });

});

gulp.task('build', ['static', 'test'])

gulp.task('npm-publish', gulpShell.task('npm publish'));

gulp.task('pre-release', cb => {
  readyToRelease();
  cb();
});

gulp.task('release', (cb) => {
  fancyLog('# Performing Pre-Release Checks...');
  if (!readyToRelease()) {
    fancyLog(acolors.red('# Pre-Release Checks have failed. Please fix them and try again. Aborting...'));
    cb();
  }
  else {
    fancyLog(acolors.green('# Pre-Release Checks have succeeded. Continuing...'));
    runSequence(
      'static',
      'bump-version',
      'changelog',
      'commit-changes',
      'push-changes',
      'create-new-tag',
      'github-release',
      'npm-publish',
      (error) => {
        if (error) {
          fancyLog(error.message);
        } else {
          fancyLog(acolors.green('RELEASE FINISHED SUCCESSFULLY'));
        }
        cb(error);
      });

  }
});


gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test', 'coveralls']);
