const _ = require('lodash');
const del = require('del');
const gulp = require('gulp');
const acolors = require('ansi-colors');
const fancyLog = require('fancy-log');
const helpers = require('./config/helpers');

/** External command runner */
const process = require('process');
const execSync = require('child_process').execSync;

/** File Access */
const fs = require('fs');
const path = require('path');
const gulpFile = require('gulp-file');

/** To properly handle pipes on error */
const pump = require('pump');<% if(!skipCoveralls) { %>

/** Testing/Code Coverage */
const gulpCoveralls = require('gulp-coveralls');<% } if(testingFramework === 'jest') {%>
const jestCli = require('jest-cli');<% } %>

/** To order tasks */
const runSequence = require('run-sequence');

//Bumping, Releasing tools
const gulpGit = require('gulp-git');
const gulpBump = require('gulp-bump');
const gulpConventionalChangelog = require('gulp-conventional-changelog');<% if(!skipGhReleasing) { %>
const conventionalGithubReleaser = require('conventional-github-releaser');<% } %>

/** To load gulp tasks from multiple files */
const gulpHub = require('gulp-hub');<% if(useCompodoc){ %>

/** Documentation generation tools **/
const gulpCompodoc = require('@compodoc/gulp-compodoc');<% } %>

const yargs = require('yargs');
const argv = yargs
  .option('version', {
    alias: 'v',
    describe: 'Enter Version to bump to',
    choices: ['patch', 'minor', 'major'],
    type: "string"
  })<% if(!skipGhReleasing) { %>
  .option('ghToken', {
    alias: 'gh',
    describe: 'Enter Github Token for releasing',
    type: "string"
  })<% } %>
  .version(false) // disable default --version from yargs( since v9.0.0)
  .argv;

const config = {
  libraryName: '<%= projectName %>',
  unscopedLibraryName: '<%= unscopedProjectName %>',
  libDir: 'projects/<%= githubRepoName %>/',
  outputLibDir: 'dist/<%= githubRepoName %>/',
  outputDemoDir: 'dist/<%= githubRepoName %>-demo/browser/',
  coverageDir: 'coverage/'
};

const getPackageJsonVersion = () => {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won't be updated
  return JSON.parse(fs.readFileSync(`${config.libDir}/package.json`, 'utf8')).version;
};

const isOK = condition => {
  if(condition === undefined){
    return acolors.yellow('[SKIPPED]');
  }
  return condition ? acolors.green('[OK]') : acolors.red('[KO]');
};

const readyToRelease = () => {<% if(!skipTravis) { %>
  let isTravisPassing = /build #\d+ passed/.test(execSync('npm run check-travis').toString().trim());<% } %>
  let onMasterBranch = execSync('git symbolic-ref --short -q HEAD').toString().trim() === 'master';
  let canBump = !!argv.version;<% if(!skipGhReleasing) { %>
  let canGhRelease = argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN;<% } %>
  let canNpmPublish = !!execSync('npm whoami').toString().trim() && execSync('npm config get registry').toString().trim() === 'https://registry.npmjs.org/';

  fancyLog(`[travis-ci]      Travis build on 'master' branch is passing............................................${isOK(<% if(!skipTravis) { %>isTravisPassing<% } %>)}`);
  fancyLog(`[git-branch]     User is currently on 'master' branch..................................................${isOK(onMasterBranch)}`);
  fancyLog(`[npm-publish]    User is currently logged in to NPM Registry...........................................${isOK(canNpmPublish)}`);
  fancyLog(`[bump-version]   Option '--version' provided, with value : 'major', 'minor' or 'patch'.................${isOK(canBump)}`);
  fancyLog(`[github-release] Option '--ghToken' provided or 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' variable set......${isOK(<% if(!skipGhReleasing) { %>canGhRelease<% } %>)}`);

  return <% if(!skipTravis) { %>isTravisPassing && <% } %>onMasterBranch && canBump && <% if(!skipGhReleasing) { %>canGhRelease && <% } %>canNpmPublish;
};

const execCmd = (name, args, opts, ...subFolders) => {
  const cmd = helpers.root(subFolders, helpers.binPath(`${name}`));
  return helpers.execp(`${cmd} ${args}`, opts)
    .catch(e => {
      fancyLog(acolors.red(`${name} command failed. See below for errors.\n`));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
};

const execExternalCmd = (name, args, opts) => {
  return helpers.execp(`${name} ${args}`, opts)
    .catch(e => {
      fancyLog(acolors.red(`${name} command failed. See below for errors.\n`));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
};


/////////////////////////////////////////////////////////////////////////////
// Cleaning Tasks
/////////////////////////////////////////////////////////////////////////////<% if(useCompodoc){ %>

gulp.task('clean:doc', () => {
  return del(`${config.outputLibDir}/doc`);
});<% } %>

gulp.task('clean', ['clean:doc']);

/////////////////////////////////////////////////////////////////////////////
// Compilation Tasks
/////////////////////////////////////////////////////////////////////////////

gulp.task('lint', () => {
  return execCmd('ng', 'lint <%= githubRepoName %>');
});


gulp.task('ngc',() => {
  return execCmd('ng', 'build --prod <%= githubRepoName %>');
});

// Lint and Ng-Compile
gulp.task('compile', (cb) => {
  runSequence('lint', 'ngc', cb);
});

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', ['clean'], (cb) => {
  runSequence('compile', 'test', 'npm-package', cb);
});


/////////////////////////////////////////////////////////////////////////////
// Packaging Tasks
/////////////////////////////////////////////////////////////////////////////

// Prepare 'dist' folder for publication to NPM
gulp.task('npm-package', (cb) => {
  let pkgJson = JSON.parse(fs.readFileSync('${config.libDir}/package.json', 'utf8'));
  let targetPkgJson = {};
  let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

  targetPkgJson['name'] = config.libraryName;

  //only copy needed properties from project's package json
  fieldsToCopy.forEach((field) => { targetPkgJson[field] = pkgJson[field]; });

  targetPkgJson['main'] = `./bundles/${config.unscopedLibraryName}.umd.js`;<% if(ngVersion === '2.0.0'){ %>
  targetPkgJson['module'] = `./index.js`;
  targetPkgJson['typings'] = `./index.d.ts`;<% } else {%>
  targetPkgJson['module'] = `./<% if(ngVersionMin >= 5){ %>esm5/${config.unscopedLibraryName}.es5.js<% } else {%>${config.libraryName}.es5.js<% } %>`;
  targetPkgJson['es2015'] = `./<% if(ngVersionMin >= 5){ %>esm2015/${config.unscopedLibraryName}.js<% } else {%>${config.libraryName}.js<% } %>`;
  targetPkgJson['typings'] = `./${config.unscopedLibraryName}.d.ts`;<% } %>

  // defines project's dependencies as 'peerDependencies' for final users
  targetPkgJson.peerDependencies = {};
  Object.keys(pkgJson.dependencies).forEach((dependency) => {
    // versions are defined as '^' by default, but you can customize it by editing "dependenciesRange" in '.yo-rc.json' file
    targetPkgJson.peerDependencies[dependency] = `<%- dependenciesRange %>${pkgJson.dependencies[dependency].replace(/[\^~><=]/,'')}`;
  });

  // copy the needed additional files in the 'dist' folder
  pump(
    [
      gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md', <% for (a of additionalPackageFiles) { %>'<%= a %>', <% } %><% if(ngVersion === '2.0.0'){ %>
      `${config.buildDir}/lib-es5/**/*.js`,
      `${config.buildDir}/lib-es5/**/*.js.map`,<% } %>
      `${config.buildDir}/lib-es5/**/*.d.ts`,
      `${config.buildDir}/lib-es5/**/*.metadata.json`]),
      gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)),
      gulp.dest(config.outputLibDir)
    ], cb);
});

<% if(useCompodoc){ %>
/////////////////////////////////////////////////////////////////////////////
// Documentation Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('build:doc', (cb) => {
  pump([
    gulp.src(`${config.libDir}/src/**/*.ts`),
    gulpCompodoc({
      tsconfig: `${config.libDir}/src/tsconfig.lib.json`,
      hideGenerator:true,
      disableCoverage: true,
      output: `${config.outputDemoDir}/doc/`
    })
  ], cb);
});

gulp.task('serve:doc', ['clean:doc'], (cb) => {
  pump([
    gulp.src(`${config.libDir}/src/**/*.ts`),
    gulpCompodoc({
      tsconfig: `${config.libDir}/src/tsconfig.lib.json`,
      serve: true,
      output: `${config.outputLibDir}/doc/`
    })
  ], cb);
});<% } %>

/////////////////////////////////////////////////////////////////////////////
// Demo Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('test:demo', () => {
  return <% if(testingFramework === 'jest') {%>execExternalCmd('npm', 'run test');<%} else {%>execCmd('ng', 'test <%= githubRepoName %>-demo');<%}%>
});

gulp.task('serve:demo', () => {
  return execCmd('ng','serve --aot <% if(useCompodoc){ %> --proxy-config proxy.conf.json<% } %> <%= githubRepoName %>-demo');
});

gulp.task('serve:demo-hmr', () => {
  return execCmd('ng', 'serve --configuration hmr --aot<% if(useCompodoc){ %> --proxy-config proxy.conf.json<% } %> <%= githubRepoName %>-demo');
});

gulp.task('build:demo', () => {
  return execCmd('ng', 'build --preserve-symlinks --prod --base-href /<%=githubRepoName%>/ --deploy-url /<%=githubRepoName%>/ <%= githubRepoName %>-demo');
});

gulp.task('serve:demo-ssr',['build:demo-ssr'], () => {
  return execExternalCmd('node', 'dist/server.js';
});

gulp.task('build:demo-ssr', () => {
  return execCmd('ng','build --preserve-symlinks --prod <%= githubRepoName %>-demo')
    .then(() => execCmd('ng', 'run <%= projectName %>-demo:server'))
    .then(() => execCmd('webpack', '--config webpack.server.config.js --progress --colors'))
    .catch(e => {
      fancyLog(acolors.red(`build:demo-ssr command failed. See below for errors.\n`));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
});

gulp.task('push:demo', () => {
  return execCmd('ngh',`--dir ${config.outputDemoDir} --message="chore(demo): :rocket: deploy new version"`);
});

gulp.task('deploy:demo', (cb) => {
  runSequence('build:demo'<%- (useCompodoc) ? ", 'build:doc'": ""%>, 'push:demo', cb);
});<% } %>


/////////////////////////////////////////////////////////////////////////////
// Test Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('test', (cb) => {<% if(testingFramework === 'jest') {%>
  let isTravis = !!process.env.TRAVIS;
  return jestCli.runCLI({ config: require('./package.json').jest, coverage: true, runInBand: isTravis, ci: isTravis }, ".").then(({ results }) => {
    if (!results.success) throw new Error('There are test failures!');
  });<% } else { %>
  return execCmd('ng','test <%= githubRepoName %>');<% } %>
});


/////////////////////////////////////////////////////////////////////////////
// Release Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('changelog', (cb) => {
  pump(
    [
      gulp.src('CHANGELOG.md', { buffer: false }),
      gulpConventionalChangelog({ preset: 'angular', releaseCount: 0 }),
      gulp.dest('./')
    ], cb);
});<% if(!skipGhReleasing) {%>

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
});<% } %>

gulp.task('bump-version', (cb) => {
  if (!argv.version) {
    fancyLog(acolors.red(`You must specify which version to bump to (Possible values: 'major', 'minor', and 'patch')`));
    throw new Error(`Missing '--version' argument`);
  }

  pump(
    [
      gulp.src('./package.json'),
      gulpBump({ type: argv.version }),
      gulp.dest('./'),
    ], cb);
});

gulp.task('commit-changes', (cb) => {
  let version = getPackageJsonVersion();
  pump(
    [
      gulp.src('.'),
      gulpGit.add(),
      gulpGit.commit(`chore(release): bump version number to ${version}`)
    ], cb);
});

gulp.task('push-changes', (cb) => {
  gulpGit.push('origin', 'master', cb);
});

gulp.task('create-new-tag', (cb) => {
  let version = `v${getPackageJsonVersion()}`;
  gulpGit.tag(version, `chore(release): :sparkles: :tada: create tag for version v${version}`, (error) => {
    if (error) {
      return cb(error);
    }
    gulpGit.push('origin', 'master', { args: '--tags' }, cb);
  });

});

// Build and then Publish 'dist' folder to NPM
gulp.task('npm-publish', ['build'], () => {
  return execExternalCmd('npm',`publish ${config.outputLibDir}`)
});

// Perfom pre-release checks (no actual release)
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
      'bump-version',
      'changelog',
      'commit-changes',
      'push-changes',
      'create-new-tag',<% if(!skipGhReleasing) {%>
      'github-release',<% } %>
      'npm-publish',
      'deploy:demo',
      (error) => {
        if (error) {
          fancyLog(acolors.red(error.message));
        } else {
          fancyLog(acolors.green('RELEASE FINISHED SUCCESSFULLY'));
        }
        cb(error);
      });
  }
});


/////////////////////////////////////////////////////////////////////////////
// Utility Tasks
/////////////////////////////////////////////////////////////////////////////

// Link 'dist' folder (create a local '<%= projectName %>' package that symlinks to it)
// This way, we can have the demo project declare a dependency on '<%= projectName %> (as it should)
// and, thanks to 'npm link ng-scrollreveal' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', () => {
  return execExternalCmd('npm', 'link', { cwd: `${config.outputLibDir}` });
});

gulp.task('unlink', () => {
  return execExternalCmd('npm', 'unlink', { cwd: `${config.outputLibDir}` });
});<% if(!skipCoveralls) {%>

// Upload code coverage report to coveralls.io (will be triggered by Travis CI on successful build)
gulp.task('coveralls', (cb) => {
  pump(
    [
      gulp.src(`${config.coverageDir}/<%= testingFramework === 'jest' ? 'lcov.info': 'coverage.lcov' %>`),
      gulpCoveralls()
    ], cb);
});<% } %>

gulp.task('default', ['build']);

// Load additional tasks
gulpHub(['./config/gulp-tasks/*.js']);
