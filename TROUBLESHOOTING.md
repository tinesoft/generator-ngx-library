# Troubleshooting

## 3rd-party libraries that i use (like ngx-bootstrap,...) are bundled with my final UMD bundle. Why?

First, make sure you are running at least [v5.6.0](https://github.com/tinesoft/generator-ngx-library/releases/tag/v5.6.0) of the generator, as it fixes a small bug that caused third-party libraries to get bundled with your final UMD file, even if they were specified as `externals` and `globals` in `Rollup` configuration.

Normally, this is now being properly taken care of for you by the generator. So a simple regeneration should fix the issue.

But in case you don't want to regenerate your project, simply edit your `gulpfile.js` (go to `rollup-bundle` gulp task).
Make sure that all your 3rd prty packages are listed in the `globals` variable:

```js
{
    ...
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',

    // ATTENTION:
    // Add any other dependency or peer dependency of your library here
    // This is required for UMD bundle users. For example:
    'ngx-bootstrap': 'ngxBootstrap', // (NOTE: always use camelCase for the value)
    // Be sure to also list any sub-module you import in your source files
    'ngx-bootstrap/modal': 'ngxBootstrap.modal` // NOTE: always use camelCase and replace '/' -> '.'
};
```

and add `fail: distFolder` to `rollupBaseConfig.plugins[rollupNodeResolve()]` params:

```js
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
```

## I'm getting " 'your-third-party-package' is imported by path/to/your.js, but could not be resolved – treating it as an external dependency" or "No name was provided for external module 'your-module' in options.globals – guessing 'moduleName'" warnings during 'rollup-bundle' task when running gulp build. What should i do?

Make sure that all your 3rd party packages (*and sub-packages*) are listed in the `globals` variable:

```js
{
    ...
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',

    // ATTENTION:
    // Add any other dependency or peer dependency of your library here
    // This is required for UMD bundle users. For example:
    'ngx-bootstrap': 'ngxBootstrap', // (NOTE: always use camelCase for the value)
    // Be sure to also list any sub-module you import in your source files
    'ngx-bootstrap/modal': 'ngxBootstrap.modal` // NOTE: always use camelCase and replace '/' -> '.'
};

```