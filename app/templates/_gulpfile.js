const _ = require('lodash');
const del = require('del');
const gulp = require('gulp');
const acolors = require('ansi-colors');
const fancyLog = require('fancy-log');
const helpers = require('./config/helpers');

/** TSLint checker */<% if(ngVersionMin >= 4){ %>
const tslint = require('tslint');<% } %>
const gulpTslint = require('gulp-tslint');

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

/** To compile & bundle the library with Angular & Rollup */<% if(ngVersionMin === 2) { %>
const ngc = (args) => {// Promisify version of the ngc compiler
  const project = args.p || args.project || '.';
  const cmd = helpers.root(helpers.binPath('ngc'));
  return helpers.execp(`${cmd} -p ${project}`);
};<% } else if(ngVersionMin === 4) { %>
const ngc = require('@angular/compiler-cli/src/main').main;<% } else if(ngVersionMin >= 5) {%>
const ngc = (args) => new Promise((resolve, reject)=>{// Promisify version of the ngc compiler
  let exitCode = require('@angular/compiler-cli/src/main').main(args);
  resolve(exitCode);
});<% } %>
const rollup = require('rollup');
const rollupUglify = require('rollup-plugin-uglify');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupCommonjs = require('rollup-plugin-commonjs');

/** To load templates and styles in Angular components */
const gulpInlineNgTemplate = require('gulp-inline-ng2-template');<% if(!skipStyles) { %>

/** Sass style */
const sass = require('node-sass');
const cssnano = require('cssnano');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const stripInlineComments = require('postcss-strip-inline-comments');<% } %>

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
  allSrc: 'src/**/*',
  allTs: 'src/**/!(*.spec).ts',<% if(!skipStyles) { %>
  allSass: 'src/**/*.+(scss|sass)',
  allHtml: 'src/**/*.html',<% } %>
  demoDir: 'demo/',
  buildDir: 'tmp/',
  outputDir: 'dist/',
  outputDemoDir: 'demo/dist/browser/',
  coverageDir: 'coverage/'
};

const rootFolder = path.join(__dirname);
const buildFolder = path.join(rootFolder, `${config.buildDir}`);
const distFolder = path.join(rootFolder, `${config.outputDir}`);
const es5OutputFolder = path.join(buildFolder, 'lib-es5');<% if(ngVersionMin >= 4) { %>
const es2015OutputFolder = path.join(buildFolder, 'lib-es2015');<% } %>

//Helper functions<% if(testingFramework === 'karma'){%>
const startKarmaServer = (isTddMode, hasCoverage, cb) => {
  const karmaServer = require('karma').Server;<% if(!skipTravis) {%>
  const isCI = process.env.TRAVIS;<% } %>

  let config = { configFile: `${__dirname}/karma.conf.js`, singleRun: !isTddMode, autoWatch: isTddMode };<% if(!skipTravis) {%>

  if (isCI) {
    config['browsers'] = ['ChromeHeadlessCI'];
  }<% } %>

  config['hasCoverage'] = hasCoverage;

  new karmaServer(config, cb).start();
};<% } %>

const getPackageJsonVersion = () => {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won't be updated
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
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

<% if(!skipStyles) { %>
// Compile Sass to css
const styleProcessor = (stylePath, ext, styleFile, callback) => {
  /**
   * Remove comments, autoprefixer, Minifier
   */
  const processors = [
    stripInlineComments,
    autoprefixer,
    cssnano
  ];

  const postProcessCss = css => {
    postcss(processors).process(css, {from: undefined}).then(result => {
      result.warnings().forEach(function (warn) {
        fancyLog.warn(warn.toString());
      });
      styleFile = result.css;
      callback(null, styleFile);
    });
  };

  if (/\.(scss|sass)$/.test(ext[0])) {
    let sassObj = sass.renderSync({ file: stylePath });
    if (sassObj && sassObj['css']) {
      let css = sassObj.css.toString('utf8');
      postProcessCss(css);
    }
  } else if (/\.css$/.test(ext[0])) {
    postProcessCss(styleFile);
  }
};
<% } %>
/////////////////////////////////////////////////////////////////////////////
// Cleaning Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('clean:dist', () => {
  return del(config.outputDir);
});

gulp.task('clean:build', () => {
  return del(config.buildDir);
});

gulp.task('clean:coverage', () => {
  return del(config.coverageDir);
});<% if(useCompodoc){ %>

gulp.task('clean:doc', () => {
  return del(`${config.outputDir}/doc`);
});<% } %>

gulp.task('clean', ['clean:dist', 'clean:coverage', 'clean:build']);

/////////////////////////////////////////////////////////////////////////////
// Compilation Tasks
/////////////////////////////////////////////////////////////////////////////

gulp.task('lint', (cb) => {
  pump([
    gulp.src(config.allTs),
    gulpTslint(
      {
        <% if(ngVersionMin >= 4){%>program: tslint.Linter.createProgram('./tsconfig.json'),<% } %>
        formatter: 'verbose',
        configuration: 'tslint.json'
      }),
    gulpTslint.report()
  ], cb);
});

// Inline Styles and Templates into components
gulp.task('inline-templates', (cb) => {
  const options = {
    base: `${config.buildDir}`,<% if(!skipStyles) { %>
    styleProcessor: styleProcessor,<% } %>
    useRelativePaths: true
  };
  pump(
    [
      gulp.src(config.allTs),
      gulpInlineNgTemplate(options),
      gulp.dest(`${config.buildDir}`)
    ],
    cb);
});

// Prepare files for compilation
gulp.task('pre-compile', (cb) => {
   pump([
    gulp.src([config.allSrc]),
    gulp.dest(config.buildDir)
    ], cb);
});

gulp.task('ng-compile',() => {
  return Promise.resolve()
    // Compile to ES5.
    .then(() => ngc(<% if(ngVersionMin === 2){ %>{ project: `${buildFolder}/tsconfig.lib.json` }<% } else if(ngVersionMin === 4){ %>{ project: `${buildFolder}/tsconfig.lib.es5.json` }<% } else {%>['--project',`${buildFolder}/tsconfig.lib.es5.json`]<%}%>)
      .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
      .then(() => fancyLog('ES5 compilation succeeded.'))
    )<% if(ngVersionMin >= 4){ %>
    // Compile to ES2015.
    .then(() => ngc(<% if(ngVersionMin === 4){ %>{ project: `${buildFolder}/tsconfig.lib.json` }<% } else {%>['--project',`${buildFolder}/tsconfig.lib.json`]<%}%>)
      .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
      .then(() => fancyLog('ES2015 compilation succeeded.'))
    )<% } %>
    .catch(e => {
      fancyLog(acolors.red('ng-compilation failed. See below for errors.\n'));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
});

// Lint, Prepare Build, <% if(!skipStyles) { %>, Sass to css, Inline templates & Styles<% } %> and Ng-Compile
gulp.task('compile', (cb) => {
  runSequence('lint', 'pre-compile', 'inline-templates', 'ng-compile', cb);
});

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', ['clean'], (cb) => {
  runSequence('compile', 'test', 'npm-package', 'rollup-bundle', cb);
});

// Same as 'build' but without cleaning temp folders (to avoid breaking demo app, if currently being served)
gulp.task('build-watch', (cb) => {
  runSequence('compile', 'test', 'npm-package', 'rollup-bundle', cb);
});

// Same as 'build-watch' but without running tests
gulp.task('build-watch-no-tests', (cb) => {
  runSequence('compile', 'npm-package', 'rollup-bundle', cb);
});

// Watch changes on (*.ts, *.html<% if(!skipStyles) { %>, *.sass<% } %>) and Re-build library
gulp.task('build:watch', ['build-watch'], () => {
  gulp.watch([config.allTs<% if(!skipStyles) { %>, config.allHtml, config.allSass<% } %>], ['build-watch']);
});

// Watch changes on (*.ts, *.html<% if(!skipStyles) { %>, *.sass<% } %>) and Re-build library (without running tests)
gulp.task('build:watch-fast', ['build-watch-no-tests'], () => {
  gulp.watch([config.allTs<% if(!skipStyles) { %>, config.allHtml, config.allSass<% } %>], ['build-watch-no-tests']);
});


/////////////////////////////////////////////////////////////////////////////
// Packaging Tasks
/////////////////////////////////////////////////////////////////////////////

// Prepare 'dist' folder for publication to NPM
gulp.task('npm-package', (cb) => {
  let pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
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
      gulp.dest(config.outputDir)
    ], cb);
});

// Bundles the library as UMD<% if(ngVersionMin >= 4){ %>/FESM<% } %> bundles using RollupJS
gulp.task('rollup-bundle', (cb) => {
  return Promise.resolve()
  // Bundle lib.
  .then(() => {
    // Base configuration.
    const es5Input = path.join(es5OutputFolder, `<%= ngVersion === '2.0.0' ? 'index.js' : '${config.unscopedLibraryName}.js' %>`);<% if(ngVersionMin >= 4) { %>
    const es2015Input = path.join(es2015OutputFolder, `${config.unscopedLibraryName}.js`);<% } %>
    const globals = {
      // The key here is library name, and the value is the name of the global variable name
      // the window object.
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.

      // Angular dependencies <% for (ngModule of ngModules) { %>
      '@angular/<%= ngModule %>': 'ng.<%= ngModule %>',<% } %>

      // Rxjs dependencies
      'rxjs/Subject': 'Rx',
      'rxjs/Observable': 'Rx',
      'rxjs/add/observable/fromEvent': 'Rx.Observable',
      'rxjs/add/observable/forkJoin': 'Rx.Observable',
      'rxjs/add/observable/of': 'Rx.Observable',
      'rxjs/add/observable/merge': 'Rx.Observable',
      'rxjs/add/observable/throw': 'Rx.Observable',
      'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
      'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
      'rxjs/add/operator/map': 'Rx.Observable.prototype',
      'rxjs/add/operator/filter': 'Rx.Observable.prototype',
      'rxjs/add/operator/do': 'Rx.Observable.prototype',
      'rxjs/add/operator/share': 'Rx.Observable.prototype',
      'rxjs/add/operator/finally': 'Rx.Observable.prototype',
      'rxjs/add/operator/catch': 'Rx.Observable.prototype',
      'rxjs/add/observable/empty': 'Rx.Observable.prototype',
      'rxjs/add/operator/first': 'Rx.Observable.prototype',
      'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
      'rxjs/add/operator/switchMap': 'Rx.Observable.prototype'<% if(otherDependencies) {%>,<%}%>

      // ATTENTION:
      // Add any other dependency or peer dependency of your library here
      // This is required for UMD bundle users.
      // See https://github.com/tinesoft/generator-ngx-library/TROUBLESHOUTING.md if trouble
      <%- otherDependencies.map(d => `'${d}': _.camelCase('${d}'.replace('/','.'))`).join(',\n      ') %>

    };
    const rollupBaseConfig = {
      output:{
        name: _.camelCase(config.libraryName),
        sourcemap: true,
        globals: globals
      },
      // List of dependencies
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
      external: Object.keys(globals),
      plugins: [
        rollupCommonjs({
          include: ['node_modules/rxjs/**']
        }),
        rollupSourcemaps(),
        rollupNodeResolve({ 
          jsnext: true,
          module: true,
          jail: distFolder, // to use final 'package.json' from 'dist/'
         })
      ]
    };

    // UMD bundle.
    const umdConfig = _.merge({}, rollupBaseConfig, {
      input: es5Input,
      output: {
        format: 'umd',
        file: path.join(distFolder, `bundles`, `${config.unscopedLibraryName}.umd.js`)
      }
    });

    // Minified UMD bundle.
    const minifiedUmdConfig = _.merge({}, rollupBaseConfig, {
      input: es5Input,
      output: {
        format: 'umd',
        file: path.join(distFolder, `bundles`, `${config.unscopedLibraryName}.umd.min.js`),
      },
      plugins: rollupBaseConfig.plugins.concat([rollupUglify({})])
    });<% if(ngVersionMin >= 4){ %>

    // ESM+ES5 flat module bundle.
    const fesm5config = _.merge({}, rollupBaseConfig, {
      input: es5Input,
      output: {
        format: 'es',
        file: path.join(distFolder,<% if(ngVersionMin >= 5){ %> 'esm5', `${config.unscopedLibraryName}.es5.js`<% } else {%> `${config.libraryName}.es5.js`<% } %>),
      }
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015config = _.merge({}, rollupBaseConfig, {
      input: es2015Input,
      output: {
        format: 'es',
        file: path.join(distFolder,<% if(ngVersionMin >= 5){ %> 'esm2015', `${config.unscopedLibraryName}.js`<% } else {%> `${config.libraryName}.js`<% } %>),
      }
    });<% } %>

    const allBundles = [
      umdConfig,
      minifiedUmdConfig<% if(ngVersionMin >= 4){ %>,
      fesm5config,
      fesm2015config<% } %>
    ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg.output)));

    return Promise.all(allBundles)
      .then(() => fancyLog('All bundles generated successfully.'))
  })
  .catch(e => {
    fancyLog(acolors.red('rollup-bundling failed. See below for errors.\n'));
    fancyLog(acolors.red(e));
    process.exit(1);
  });
});

<% if(useCompodoc){ %>
/////////////////////////////////////////////////////////////////////////////
// Documentation Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('build:doc', (cb) => {
  pump([
    gulp.src('src/**/*.ts'),
    gulpCompodoc({
      tsconfig: 'src/tsconfig.lib.json',
      hideGenerator:true,
      disableCoverage: true,
      output: <%= skipDemo ? "`${config.outputDir}/doc/`": "`${config.outputDemoDir}/doc/`"%>
    })
  ], cb);
});

gulp.task('serve:doc', ['clean:doc'], (cb) => {
  pump([
    gulp.src('src/**/*.ts'),
    gulpCompodoc({
      tsconfig: 'src/tsconfig.lib.json',
      serve: true,
      output: `${config.outputDir}/doc/`
    })
  ], cb);
});<% } if(skipDemo) { %>

gulp.task('push:doc', () => {
  return execCmd('ngh',`--dir ${config.outputDir}/doc/ --message="chore(doc): :rocket: deploy new version"`);
});<% } %>


<% if(!skipDemo) { %>
/////////////////////////////////////////////////////////////////////////////
// Demo Tasks
/////////////////////////////////////////////////////////////////////////////
const execDemoCmd = (args,opts) => {
  if(fs.existsSync(`${config.demoDir}/node_modules`)){
    return execCmd('ng', args, opts, `/${config.demoDir}`);
  }
  else{
    fancyLog(acolors.yellow(`No 'node_modules' found in '${config.demoDir}'. Installing dependencies for you...`));
    return helpers.installDependencies({ cwd: `${config.demoDir}` })
      .then(exitCode => exitCode === 0 ? execCmd('ng', args, opts, `/${config.demoDir}`) : Promise.reject())
      .catch(e => {
        fancyLog(acolors.red(`ng command failed. See below for errors.\n`));
        fancyLog(acolors.red(e));
        process.exit(1);
      });
  }
};

gulp.task('test:demo', () => {
  return <% if(testingFramework === 'jest') {%>execExternalCmd('npm', 'run test'<%} else {%>execDemoCmd('test --preserve-symlinks'<%}%>, { cwd: `${config.demoDir}`});
});

gulp.task('serve:demo', () => {
  return execDemoCmd('serve --aot<% if(useCompodoc){ %> --proxy-config proxy.conf.json<% } %>', { cwd: `${config.demoDir}` });
});

gulp.task('serve:demo-hmr', () => {
  return execDemoCmd('serve --configuration hmr --aot<% if(useCompodoc){ %> --proxy-config proxy.conf.json<% } %>', { cwd: `${config.demoDir}` });
});

gulp.task('build:demo', () => {
  return execDemoCmd(`build --preserve-symlinks --prod --base-href /<%=githubRepoName%>/ --deploy-url /<%=githubRepoName%>/`, { cwd: `${config.demoDir}`});
});

gulp.task('serve:demo-ssr',['build:demo-ssr'], () => {
  return execExternalCmd('node', 'dist/server.js', { cwd: `${config.demoDir}` });
});

gulp.task('build:demo-ssr', () => {
  return execDemoCmd(`build --preserve-symlinks --prod`, { cwd: `${config.demoDir}`})
    .then(() => execDemoCmd(`run <%= projectName %>-demo:server`, { cwd: `${config.demoDir}` }))
    .then(() => execCmd('webpack', '--config webpack.server.config.js --progress --colors', { cwd: `${config.demoDir}` }, `/${config.demoDir}`))
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
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
  startKarmaServer(false, true, cb);<% } %>
});

gulp.task('test:ci', ['clean'], (cb) => {
  runSequence('compile', 'test');
});

gulp.task('test:watch', (cb) => {<% if(testingFramework === 'jest') {%>
  return jestCli.runCLI({ config: require('./package.json').jest, watch: true }, ".").then(({ results }) => {
    if (!results.success) throw new Error('There are test failures!');
  });<% } else { %>
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
  startKarmaServer(true, true, cb);<% } %>
});

gulp.task('test:watch-no-cc', (cb) => {//no coverage (useful for debugging failing tests in browser)<% if(testingFramework === 'jest') {%>
  return jestCli.runCLI({ config: require('./package.json').jest, watch: true, coverage:false }, ".").then(({ results }) => {
    if (!results.success) throw new Error('There are test failures!');
  });<% } else { %>
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
  startKarmaServer(true, false, cb);<% } %>
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
  return execExternalCmd('npm',`publish ${config.outputDir} --access public`)
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
      'npm-publish',<% if(!skipDemo || useCompodoc) { %>
      'deploy:<%= !skipDemo? "demo":"doc" %>',<% } %>
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

// Link 'dist' folder (create a local 'ng-scrollreveal' package that symlinks to it)
// This way, we can have the demo project declare a dependency on 'ng-scrollreveal' (as it should)
// and, thanks to 'npm link ng-scrollreveal' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', () => {
  return execExternalCmd('npm', 'link', { cwd: `${config.outputDir}` });
});

gulp.task('unlink', () => {
  return execExternalCmd('npm', 'unlink', { cwd: `${config.outputDir}` });
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
