<p align="center">
  <img height="300px" width="300px" style="text-align: center;" src="https://cdn.rawgit.com/tinesoft/generator-ngx-library/master/assets/logo.png">
 </p>
 
# generator-ngx-library - [Yeoman](http://yeoman.io/) generator to bootstrap your [Angular](https://angular.io) library creation and publication


[![npm version](https://badge.fury.io/js/generator-ngx-library.svg)](https://badge.fury.io/js/generator-ngx-library)
[![Build Status](https://travis-ci.org/tinesoft/generator-ngx-library.svg?branch=master)](https://travis-ci.org/tinesoft/generator-ngx-library)
[![Coverage Status](https://coveralls.io/repos/github/tinesoft/generator-ngx-library/badge.svg?branch=master)](https://coveralls.io/github/tinesoft/generator-ngx-library?branch=master)
[![dependencies Status](https://david-dm.org/tinesoft/generator-ngx-library/status.svg)](https://david-dm.org/tinesoft/generator-ngx-library)
[![devDependency Status](https://david-dm.org/tinesoft/generator-ngx-library/dev-status.svg?branch=master)](https://david-dm.org/tinesoft/generator-ngx-library#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/tinesoft/generator-ngx-library.svg)](https://greenkeeper.io/)
[![Join the chat at https://gitter.im/generator-ngx-library/Lobby](https://badges.gitter.im/generator-ngx-library/Lobby.svg)](https://gitter.im/generator-ngx-library/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
===========================================================================================================================================

# Demo

Here are live examples of some Angular libraries developed with the generator:

* [ng-scrollreveal](http://tinesoft.github.io/ng-scrollreveal) (by yours truly :innocent:)
* [ngx-store](https://github.com/bohoffi/ngx-score)

These are some that [i know of](https://github.com/search?q=generator-ngx-library+filename%3A.yo-rc.json+path%3A%2F&type=Code&utf8=%E2%9C%93). Want your project listed here ? Drop me a line.

# Features

These are the main features of the generator:

* **Ahead Of Time**(AOT) Compilation, **Flattened ES Modules**(FESM), **[Minified] UMD Bundles**, **Closure Compiler** support (follows [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview))
* **Code Linting** based on [codelyzer](https://github.com/mgechev/codelyzer) rules 
* **Styles** and **Templates Inlining** in components
* **SASS/SCSS** to **CSS** compilation
* **Integrated demo app** built with [angular-cli](https://cli.angular.io) and [ng-bootstrap](https://ng-bootstrap.github.io) 
* **Project Documentation** built with [compodoc](https://compodoc.github.io/website/) and published along with demo app :books:
* **Continuous Integration** with [Travis CI](https://travis-ci.org)
* **Testing Environment** with [Karma](https://karma-runner.github.io/) and [Webpack](https://webpack.github.io/)
* **Code Coverage** with [Coveralls.io](https://coveralls.io/)
* **Real-time Monitoring** and **Automatic Updates** of npm dependencies with [Greenkeeper](https://greenkeeper.io) :palm_tree:
* **Publication** to [npm registry](https://npmjs.org)
* **Releasing** to [Github](https://help.github.com/articles/about-releases/) :octocat:
* and so much more out-of-the-box :package:!



# Installation & Usage

## Requirements

You should already have the following dependencies installed: **Node.js(npm)**, **Yeoman** , **Gulp** and **Angular CLI**. if not:

* Install [Node.js](https://nodejs.org/). This will also install npm, which is the node package manager we are using in the next commands.
* Install [Yeoman](https://yeoman.io): ```npm install -g yo```
* Install [Gulp](https://gulpjs.com): ```npm install -g gulp-cli```
* Install [Angular CLI](http://github.com/angular/angular-cli): ```npm install -g @angular/cli```

Otherwise, install directly the generator via:

```
$ npm install -g generator-ngx-library
```

## Usage

Once installed, simply run the following command:

```
$ yo ngx-library
```
And answer the questions you are prompted to.

![generator-ngx-library in action!](assets/ngx-library.png)

## Options

The following options can be passed to customize the generator.
The syntax is:

```
$ yo ngx-library --option-name
```

Name         | Purpose
-------------|----------
skip-install | skips the automatic installation of project dependencies at the end of the generator
skip-checks  | skips the checks of required tools (yarn, angular-cli) prior to generation
skip-cache   | forces the regeneration on an exising project (ignore previous answers)
skip-styles  | skips the generation of style inlining related code (in case you don't use styles)
skip-demo    | skips the generation of the demo application
npm          | forces usage of `npm` to install dependencies



# Overall Directory Structure

At a high level, the generated structure looks exactly like this:

```
my-ngx-library/
  |- .git/
  |- src/
  |  |	|- component/
  |  |	|  |- lib.component.html
  |  |	|  |- lib.component.scss
  |  |	|  |- lib.component.spec.ts
  |  |	|  |- lib.component.ts
  |  |	|- component/
  |  |	|  |- lib.service.spec.ts
  |  |	|  |- lib.service.ts
  |  |	|- index.ts
  |  |	|- lib.module.ts
  |  |	|- tsconfig.lib.es5.ts #if targeting Angular v4.x.x
  |  |	|- tsconfig.lib.json
  |  |	|- tsconfig.spec.json
  |- config/
  |  |	|- helpers.js
  |  |	|- karma-test-shim.js
  |  |	|- karma.conf.js
  |  |	|- webpack.test.js
  |- demo/
  |  |- e2e/
  |  |	|- app.e2e-spec.ts
  |  |	|- app.po.ts
  |  |	|- tsconfig.e2e.json
  |  |- src/
  |  |	|- app/
  |  |	|  |- getting-started/
  |  |	|  |  |- getting-started.component.html
  |  |	|  |  |- getting-started.component.scss
  |  |	|  |  |- getting-started.component.ts
  |  |	|  |  |- getting-started.component.spec.ts
  |  |	|  |- home/
  |  |	|  |  |- home.component.html
  |  |	|  |  |- home.component.scss
  |  |	|  |  |- home.component.ts
  |  |	|  |  |- home.component.spec.ts
  |  |	|  |- shared/
  |  |	|  |- app-rooting.ts
  |  |	|  |- app.component.html
  |  |	|  |- app.component.scss
  |  |	|  |- app.component.spec.ts
  |  |	|  |- app.component.ts
  |  |	|  |- app.module.ts
  |  |	|  |- index.ts
  |  |	|- assets/
  |  |	|  |- .gitkeep
  |  |	|  |- logo.svg
  |  |	|- environments/
  |  |	|  |- environment.prod.ts
  |  |	|  |- environment.ts
  |  |	|- _variabbles.scss
  |  |	|- index.html
  |  |	|- favicon.ico
  |  |	|- main.ts
  |  |	|- polyfills.ts
  |  |	|- styles.scss
  |  |	|- test.ts
  |  |	|- tsconfig.app.json
  |  |	|- tsconfig.spec.json
  |  |	|- typings.d.ts
  |  |- .angular-cli.json
  |  |- .editorconfig
  |  |- .gitignore
  |  |- karma.config.js
  |  |- package.json
  |  |- protractor.conf.js
  |  |- README.md
  |  |- tsconfig.json
  |  |- tslint.json
  |  |- yarn.lock
  |- .editorconfig
  |- .gitignore
  |- .travis.yml
  |- CHANGELOG.md
  |- gulpfile.js
  |- karma.conf.js
  |- LICENSE
  |- package.json
  |- tsconfig.json
  |- tsconfig-aot.json
  |- tslint.json
  |- webpack.config.js
```

Here are the main files and folders:

File / Folder       | Purpose
:-------------------|:---------------------------------------------------------------------------------------------------------
`gulpfile.js`       | The gulp configuration file to manage the whole project build lifecycle (from testing to releasing)
`tslint.json`       | This file contains rules to lint your library based on [codelyzer](https://github.com/mgechev/codelyzer)
`tsconfig.json`     | The typescript configuration file used for editors (VSCode, ...)
`src/tsconfig.lib.es5.json` | The typescript configuration file used to compile your library in an AoT compatible way, as ESM/ES5 module (only available when targeting Angular v4.x.x)
`src/tsconfig.lib.json` | The typescript configuration file used to compile your library in an AoT compatible way, either as ESM/ES2015 module (when targeting Angular v4.x.x) or as ESM/ES5 module (when targeting Angular v2.x.x)
`src/tsconfig.spec.json` | The typescript configuration file used for tests
`src/`              | This folder will contain all the files of your library
`config/`           | This folder contains the configuration files for tools used to test your lib (`Webpack` & `Karma`)
`demo/`             | This folder contains an integrated demo application, to showcase your library. The demo app is built with [angular-cli](https://github.com/angular/angular-cli) (v1.0.0), so everything you know about the CLI is applicable inside this folder.
`dist/` (generated) | This generated folder contains everything that will be published as part of your package to [npm registry](https://npmjs.org).  It contains only necessary files and is built via `gulp build`command

> **Note** :
> The demo app has a dependency on your local package, that is post-installed via `npm link <YOUR_PACKAGE_NAME>` and point to the generated `dist/` folder (from project root). This way, you can be sure you are using the library as final users will, without having to publish it first.
>
> Besides, any changes to the files in the `dist/` folder will immediately affect the global `<YOUR_PACKAGE_NAME>` package, allowing you to quickly test any changes you make to your library.
>
> `npm link` is very similar to npm install -g except that instead of downloading the package from the repo, the just cloned `dist/` folder becomes the global package. 

# Overall Distributed Package Structure

Depending on the minimal version of Angular your library targets (2.x.x or 4.x.x), the distributed package files are different:

### For Angular >=v4.x.x

The published package follows the official [Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview)

```
dist/
	|- bundles/                           # Directory that contains all bundles (UMD/ES5)
	|  |- my-ngx-library.umd.js           # UMD bundle
	|  |- my-ngx-library.umd.js.map       # UMD bundle sourcemap
	|  |- my-ngx-library.umd.min.js       # Minified UMD bundle
	|  |- my-ngx-library.umd.min.js.map   # Minified UMD bundle sourcemap
	|- module/                            # 
	|  |- component/                      #
	|  |  |- lib.component.d.ts           # Type definitions
	|  |- service/                        #
	|  |  |- lib.service.d.ts             # Type definitions
	|- CHANGELOG.md                       #
	|- my-ngx-library.d.ts                # Type definitions
	|- my-ngx-library.es5.js              # ESM+ES5 flat module (FESM5)
	|- my-ngx-library.es5.js.map          # ESM+ES5 flat module (FESM5) sourcemap
	|- my-ngx-library.metadata.json       # Metadata used by AOT compiler
	|- my-ngx-library.js                  # ESM+ES2015 flat module (FESM15)
	|- my-ngx-library.js.map              # ESM+ES2015 flat module (FESM15) sourcemap
	|- my-ngx-library.metadata.json       # Metadata used by AOT compiler
	|- LICENSE                            #
	|- lib.module.d.ts                    # Type definitions
	|- package.json                       # Package.json, with just the right dependencies & peerDependencies
	|- README.md                          #
```

### For Angular v2.x.x

The published package also follows the format of Angular core packages (prior to v4.0.0), but contrary to v4, there is no official(or publicly available) documentation about that format.

```
dist/
	|- bundles/                           # Directory that contains all bundles (UMD/ES5)
	|  |- my-ngx-library.umd.js           # UMD bundle
	|  |- my-ngx-library.umd.js.map       # UMD bundle sourcemap
	|  |- my-ngx-library.umd.min.js       # Minified UMD bundle
	|  |- my-ngx-library.umd.min.js.map   # Minified UMD bundle sourcemap
	|- module/                            # 
	|  |- component/                      #
	|  |  |- lib.component.d.ts           # Type definitions
	|  |  |- lib.component.metadata.json  # Metadata used by AOT compiler
	|  |- service/                        #
	|  |  |- lib.service.d.ts             # Type definitions
	|  |  |- lib.service.metadata.json    # Metadata used by AOT compiler
	|- CHANGELOG.md                       #
	|- index.d.ts                         #
	|- index.metadata.json                #
	|- LICENSE                            #
	|- lib.module.d.ts                    # Type definitions
	|- lib.module.metadata.json           # Metadata used by AOT compiler
	|- package.json                       # Package.json, with just the right dependencies & peerDependencies
	|- README.md                          #
```

# Development

It's now up to you to write your kick-ass Angular library by adding your components, directives, pipes, services... and test specification files in `src/`.

It doesn't matter how you organize files inside the folder, but it is important to **keep the** `index.ts` **at the root**, and to **export every file that must be publicly** available in your package.

Here are the most important `gulp` tasks to use during your development workflow:

Task                    | Purpose
:-----------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------
`gulp build`            | Builds everything into the `dist/` folder.
`gulp test`             | Launches the tests (`*.spec.ts`) you wrote in `src/` and run code coverage on them. The coverage report can be found in `coverage/` folder
`gulp test:watch`       | Launches tests in watch mode. Every changes in `*.spec.ts` 
`gulp test:watch-no-cc` | Same as `gulp test:watch` but files do not get instrumented for code coverage (useful for debugging)
`gulp test:demo`<sup>1</sup>       | Launches demo application tests(same as running `ng test` from `demo/`).
`gulp serve:demo`<sup>1</sup>      | Launches demo application (same as running `ng serve` from `demo/`). 
`gulp serve:doc`<sup>2</sup>       | Serves the generated compodoc documentation (from `dist/doc` folder) at https://localhost:8080. 


> **Note About compodoc and demo application** :
>
> compodoc documentation is only available if you chose to use compodoc during generator setup.
>
> When serving demo app (via `gulp serve:demo`), in order to access documenation files (which are available at URL `/doc/`),
> be sure to also serve compodoc's generated documentation files (via `gulp serve:doc`).
>
> In development, the url `/doc/` is proxied to redirect to that locally running server for compodoc files (at https://localhost:8080)
>
> In production, the generated documentations files are deployed along with the demo application and are available at same url (`/doc/`) from root `index.html`
>


> <sup>1</sup> = This task is only available if you chose not to skip demo app generation during generator setup
>
> <sup>2</sup> = This task is only available if you chose to use compodoc during generator setup

### Recipes

Some useful recipes to help you during the development process can be found [here](recipes/)

### Updating

When a new version of the generator is available, you can take advantage of the new features/bug fixes it brings by updating your globally installed version and by re-running it again (from your project root folder).

```
$ npm install -g generator-ngx-library
$ yo ngx-library
```

Please make sure to read [CHANGELOG](CHANGELOG.md) first, to take all necessary actions for a seamless upgrade.

# Versioning

To take full advantage of the generator, use [Angular's commit message convention](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md). This way, the gulp's `changelog` task can be used to generate/update the project's `CHANGELOG.md` file from Git metadata. Only relevant commit messages are considered (commits about new features, fixes, performance, and breaking changes).

# Pre-Releasing :checkered_flag:

A set of checks is automatically performed for you prior to releasing (during `gulp release`), to ensure that you are indeed ready for it. Right now, we check that:

* Travis build on `master` branch is passing
* User is currently on `master` branch
* User is currently logged in to NPM
* Option `--version` has been provided to `gulp release` task, with value: `major`, `minor` or `patch`
* Option `--ghToken` has been provided or env variable `CONVENTIONAL_GITHUB_RELEASER_TOKEN` is set

![pre release checks](assets/pre-release-checks.png)

You can also run the `gulp pre-release` task alone, to solely perform these checks without actually releasing anything.

# Releasing

Once your killer library is done, then it is time unleash the beast!

Nothing is simpler :stuck_out_tongue: 

```
$ gulp release --version=[major|minor|patch] [--ghToken=YOUR_GITHUB_TOKEN]

```

As you can see above, the releasing task can take 2 parameters:

 * **version** (mandatory): Version of the library to release, following [semantic versioning](https://semver.org). Possible values are: `patch`, `minor`, and `major`
* **ghToken** (optional): Github Token to use to [release on Github](https://help.github.com/articles/creating-releases/).  if no token is provided, default to environment variable `CONVENTIONAL_GITHUB_RELEASER_TOKEN`. 
> **How to setup Github Token** :  Go to [create a new token](https://github.com/settings/tokens/new) and set your  environment variable `CONVENTIONAL_GITHUB_RELEASER_TOKEN` to the token you just created. You can google  [How to set environment variable](https://www.google.com.au/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=how%20to%20set%20environment%20variable). The scopes for the token  you need is `public_repo` or `repo` (if you need to access private repos). [More details](https://developer.github.com/v3/oauth/#scopes).

Running this task will (in that order) :

0. check if ready for release (see [Pre-Releasing](#Pre-Releasing) above) and abort if not
1. bump the version of your library in `package.json`
2. update the `CHANGELOG.md` file based on your commit messages (provided they follow the [angular git message convention](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md))
3. commit on `master` branch
4. create and push a new tag matching the new version
5. create a new release on Github :octocat: (using the provided token or environment variable `CONVENTIONAL_GITHUB_RELEASER_TOKEN`)
6. publish the package :package: on [npm registry](https://npmjs.com) (you must be [logged in](https://docs.npmjs.com/cli/adduser) to npm)
7. build and deploy :rocket: the demo application in `demo/dist` to `gh-pages` branch

The demo application will be available at : `https://USERNAME.github.io/REPO_NAME/` (provided you chose to generate one).

The documentation will be available at : `https://USERNAME.github.io/REPO_NAME/doc/` (provided you chose to generate one) or
at `https://USERNAME.github.io/REPO_NAME/`, if you chose to skip demo application generation.

# Support

Having trouble using the generator? Want to discuss about new features to add? Come and join the project's [Gitter](https://gitter.im/generator-ngx-library/Lobby) to chat about it!

# License

Copyright (c) 2017 Tine Kondo. Licensed under the MIT License (MIT)
