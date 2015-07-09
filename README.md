generator-ng-plugin [![Build Status](https://travis-ci.org/tinesoft/generator-ng-plugin.svg)](https://travis-ci.org/tinesoft/generator-ng-plugin)[![Dependency Status](https://david-dm.org/tinesoft/generator-ng-plugin.svg)](https://david-dm.org/tinesoft/generator-ng-plugin)[![devDependency Status](https://david-dm.org/tinesoft/generator-ng-plugin/dev-status.svg)](https://david-dm.org/tinesoft/generator-ng-plugin#info=devDependencies)[![Coverage Status](https://coveralls.io/repos/tinesoft/generator-ng-plugin/badge.svg?branch=master&service=github)](https://coveralls.io/github/tinesoft/generator-ng-plugin?branch=master)
===========================================================================================================================================

Yeoman generator to bootstrap AngularJS plugin creation, with integrated demo app, [continuous integration](https://travis-ci.org) system, [dependencies](https://david-dm.org) and [code coverage](https://coveralls.io/) status.

# Demo

Here are live examples of some AngularJS plugins developed with the generator:

* [ng-browser-update](http://tinesoft.github.io/ng-browser-update)
* [ng-juxtapose](http://tinesoft.github.io/ng-juxtapose)


# Installation & Usage

### Requirements

You should already have the following dependencies installed: **Node.js(npm)**, **Yeoman**, **Bower** and **Grunt**. if not:

* Install [Node.js](http://nodejs.org/). This will also install npm, which is the node package manager we are using in the next commands.
* Install [Yeoman](http://yeoman.io): ```npm install -g yo```
* Install [Bower](http://bower.io): ```npm install -g bower```
* Install [Grunt](http://gruntjs.com): ```npm install -g grunt-cli```

Otherwise, install directly the generator via:

```
$ npm install -g generator-ng-plugin
```

### Usage

Once installed, simply run the following command:

```
$ yo ng-plugin
```

And answer the questions you are prompted to.

### Overall Directory Structure

At a high level, the generated structure looks exactly like this:

```
my-plugin/
  |- .git/
  |- bower_components/
  |- node_modules/
  |- src/
  |  |	|- my-plugin.js
  |  |	|- my-plugin.spec.js
  |  |	|- my-plugin.less
  |  |	|- my-plugin.tpl.html
  |- demo/
  |  |- app/
  |  |	|- app.js
  |  |	|- helpers/
  |  |	|  |- plunker.js/
  |  |	|  |- prettifyDirective.js/
  |  |- less/
  |  |	|- demo.less/
  |  |- index.html
  |- .bowerrc
  |- .editorconfig
  |- .gitattributes
  |- .gitignore
  |- .jshintrc
  |- .travis.yml
  |- bower.json
  |- build.config.js
  |- CHANGELOG.md
  |- changelog.tpl
  |- Gruntfile.js
  |- karma-unit.tpl.js
  |- LICENSE
  |- module.prefix
  |- module.suffix
  |- package.json
  |- README.md
```

# Development

It's now up to you to write your kick-ass AngularJS plugin by modifying generated files in **src/** and completing the tests and the demo's `index.html`.

To ensure your setup works, and during developement, launch grunt:
```
$ grunt watch
```

The built files are placed in the **build/** directory by default. Open the **build/index.html** file in your browser and check it out! Because everything is compiled, no XHR requests are needed to retrieve templates, so until this needs to communicate with your backend there is no need to run it from a web server.

Thanks to the integrated [LiveReload](http://livereload.com/) plugin, you no longer have to refresh your page after making changes! 

# Versioning

To take full advantage of the generator, use [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit). This way, the grunt's `changelog` task can be used to generate/update the project's `CHANGELOG.md` file from Git metadata. Only relevant commit messages are considered (take a look at [changelog.tpl](https://github.com/tinesoft/generator-ng-plugin/tree/master/app/templates/changelog.tpl) file to see how it get generated).

# Releasing

Once your killer plugin is written, fully tested, it is time to release it:

```
$ grunt bump-only:[major|minor|patch]*
$ grunt changelog
$ grunt bump-commit
```
> *: you must choose between 'major', 'minor', or 'patch' (see [Semantic Versioning](http://semver.org) for more information)

This will:

- update the version of your plugin in `bower.json` and `package.json` files
- update the `CHANGELOG.md` file
- commit on `master` branch
- create new tag 
- push to origin

If you want to make your plugin available to everyone, register it on Bower (one-time-only operation) via:

```
$ bower register REPO_NAME git://github.com/USER_NAME/REPO_NAME.git
```

# Deploying demo app

To deploy your demo application on Github, simply run the following commands:

```
$ grunt
$ grunt buildcontrol:ghpages
```

This will push the minified demo application in **dist/demo** to `gh-pages` branch.

The demo application is available at : http://USERNAME.github.io/REPO_NAME/

# License

Copyright (c) 2015 Tine Kondo. Licensed under the MIT License (MIT)

# Thanks To

The generated files and build system are based on [ng-boilerplate](https://github.com/ngbp/ngbp) by **Josh D. Miller**.<br/>
The generated demo app design is inspired from [ui-bootstrap](https://angular-ui.github.io/bootstrap) by **Angular UI** team.<br/>
Thanks to them for the great work!