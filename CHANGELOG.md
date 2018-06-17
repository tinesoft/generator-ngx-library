<a name="6.2.1"></a>
## [6.2.1](https://github.com/tinesoft/generator-ngx-library/compare/v6.2.0...v6.2.1) (2018-06-17)


### Bug Fixes

* **publish:** fix typo with option to publish scoped packages on npm ([a19f054](https://github.com/tinesoft/generator-ngx-library/commit/a19f054))



<a name="6.2.0"></a>
# [6.2.0](https://github.com/tinesoft/generator-ngx-library/compare/v6.1.0...v6.2.0) (2018-06-17)


### Bug Fixes

* **demo:** correct import path for `_variables.scss` in the main `styles.scss` ([2eb1e27](https://github.com/tinesoft/generator-ngx-library/commit/2eb1e27))
* **demo:** fix demo app tests (remaining `rxjs<6` code) and misplaced `karma.conf.js` ([b81afd6](https://github.com/tinesoft/generator-ngx-library/commit/b81afd6))
* **demo:** remove useless dependency on `webpack` (already referenced by CLI) ([892c7d2](https://github.com/tinesoft/generator-ngx-library/commit/892c7d2)), closes [#163](https://github.com/tinesoft/generator-ngx-library/issues/163)
* **publishing:** add missing npm option to allow publishing scoped packages ([42fc79f](https://github.com/tinesoft/generator-ngx-library/commit/42fc79f))


### Features

* **demo:** add button on home page to allow editing demo on `StackBlitz` ([8e19a53](https://github.com/tinesoft/generator-ngx-library/commit/8e19a53))
* **demo:** improve styling and remove useless `include-media` dependency ([8866231](https://github.com/tinesoft/generator-ngx-library/commit/8866231))
* **demo:** improve styling and remove useless ìnclude-media` dependency ([822413a](https://github.com/tinesoft/generator-ngx-library/commit/822413a))



<a name="6.1.0"></a>
# [6.1.0](https://github.com/tinesoft/generator-ngx-library/compare/v6.0.0...v6.1.0) (2018-05-15)


### Bug Fixes

* **core:** fix installation error due to `del` package not being found ([bf1995b](https://github.com/tinesoft/generator-ngx-library/commit/bf1995b))


### Features

* **options:** add separate `deleteExclusions` property in `.yo-rc.json` to control which excluded files get deleted or not ([2398ad6](https://github.com/tinesoft/generator-ngx-library/commit/2398ad6))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.8.0...v6.0.0) (2018-05-13)


### Bug Fixes

* **demo:** fix wrong assets url  on deployed demo app ([744931b](https://github.com/tinesoft/generator-ngx-library/commit/744931b))
* **jest:** exclude jest test files from compilation of demo app ([c64f34e](https://github.com/tinesoft/generator-ngx-library/commit/c64f34e))


### Features

* **core:** add `--del-excluded-files` option to allow deleting excluded files found in file system ([76b776b](https://github.com/tinesoft/generator-ngx-library/commit/76b776b))
* **dependencies:** update most dependencies (rollup, jest, webpack, etc) ([a490a3a](https://github.com/tinesoft/generator-ngx-library/commit/a490a3a))
* **ng6:** add support for Angular &  Angular CLI v6 ([ed942e0](https://github.com/tinesoft/generator-ngx-library/commit/ed942e0))


### BREAKING CHANGES

* **ng6:** the minimal Node version to run the generator is now **8.x.x** (required by some core ng packages like `compiler-cli@6.x.x`)



<a name="5.8.0"></a>
# [5.8.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.7.1...v5.8.0) (2018-04-17)


### Bug Fixes

* **tslint:** fix building issue when project's description exceeds 140 chars ([d69807e](https://github.com/tinesoft/generator-ngx-library/commit/d69807e)), closes [#154](https://github.com/tinesoft/generator-ngx-library/issues/154)


### Features

* **packaging:** allow packaging of additional files (images, styles,...) ([d1df8dc](https://github.com/tinesoft/generator-ngx-library/commit/d1df8dc))
* **recipe:** add recipe about how to build multi-modules libraries ([745bd09](https://github.com/tinesoft/generator-ngx-library/commit/745bd09))



<a name="5.7.1"></a>
## [5.7.1](https://github.com/tinesoft/generator-ngx-library/compare/v5.7.0...v5.7.1) (2018-03-22)


### Bug Fixes

* **module:** add missing dependency when adding `bazel` module ([1dfc011](https://github.com/tinesoft/generator-ngx-library/commit/1dfc011))
* **module:** add missing dependency when adding `compiler-cli` module ([d640864](https://github.com/tinesoft/generator-ngx-library/commit/d640864))



<a name="5.7.0"></a>
# [5.7.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.6.0...v5.7.0) (2018-03-20)


### Features

* **demo:** update demo app to Angular CLI `1.7.3` ([68804ba](https://github.com/tinesoft/generator-ngx-library/commit/68804ba))
* **ngModules:** add 'bazel' and 'service-worker' modules (for ng5+) ([8992724](https://github.com/tinesoft/generator-ngx-library/commit/8992724))
* **rollup:** update rollup to `v0.57.0` for better perfs ([ca19b0b](https://github.com/tinesoft/generator-ngx-library/commit/ca19b0b))



<a name="5.6.0"></a>
# [5.6.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.5.0...v5.6.0) (2018-02-12)


### Bug Fixes

* **core:** update github username validation to align with Github validation rules ([26b0e6f](https://github.com/tinesoft/generator-ngx-library/commit/26b0e6f)), closes [#144](https://github.com/tinesoft/generator-ngx-library/issues/144)
* **jest:** correct gulp's test tasks stopping inclusive sequences when using jest ([1200ea7](https://github.com/tinesoft/generator-ngx-library/commit/1200ea7))


### Features

* **demo:** update demo app to Angular CLI `1.6.8`, bootstrap `4.0.0` and ng-bootstrap `1.0.0` ([4e45707](https://github.com/tinesoft/generator-ngx-library/commit/4e45707))
* **doc:** add a 'Troubleshooting' section to documentation ([21d3ea3](https://github.com/tinesoft/generator-ngx-library/commit/21d3ea3))
* **umd:** fix external libraries being bundled with main UMD file  and improve related docs ([f25e037](https://github.com/tinesoft/generator-ngx-library/commit/f25e037))



<a name="5.5.0"></a>
# [5.5.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.4.0...v5.5.0) (2018-01-12)


### Features

* **demo:** update demo app to `Angular CLI` 1.6.3 ([8846d56](https://github.com/tinesoft/generator-ngx-library/commit/8846d56))
* **testing:** add support for `jest` testing platform ([#136](https://github.com/tinesoft/generator-ngx-library/issues/136)) ([f139a29](https://github.com/tinesoft/generator-ngx-library/commit/f139a29)), closes [#139](https://github.com/tinesoft/generator-ngx-library/issues/139)



<a name="5.4.0"></a>
# [5.4.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.3.0...v5.4.0) (2017-12-14)


### Features

* **demo:** update demo app to `Angular CLI 1.6` ([eb73b53](https://github.com/tinesoft/generator-ngx-library/commit/eb73b53))
* **packaging:** update library packaging to support Angular Package Format v5.0 ([7a343cc](https://github.com/tinesoft/generator-ngx-library/commit/7a343cc))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.2.0...v5.3.0) (2017-11-28)


### Bug Fixes

* **scopedLibrary:** fix scoped libraries' `*.metadata.json` not being valid (AOT compilation issue) ([18de2fb](https://github.com/tinesoft/generator-ngx-library/commit/18de2fb)), closes [#133](https://github.com/tinesoft/generator-ngx-library/issues/133)


### Features

* **workflow:** add options `--skip-travis`, `--skip-coveralls`, `--skip-gh-releasing` ([1929e3b](https://github.com/tinesoft/generator-ngx-library/commit/1929e3b)), closes [#130](https://github.com/tinesoft/generator-ngx-library/issues/130)



<a name="5.2.0"></a>
# [5.2.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.1.0...v5.2.0) (2017-11-23)


### Bug Fixes

* **demo:** fix syntax issue in `tsconfig.app.json` ([8a85613](https://github.com/tinesoft/generator-ngx-library/commit/8a85613)), closes [#128](https://github.com/tinesoft/generator-ngx-library/issues/128)
* **package.json:** fix latest packages being used when generating a project with additional deps ([7ee8ab9](https://github.com/tinesoft/generator-ngx-library/commit/7ee8ab9))
* **packaging:** correct regex used to   build `peerDependencies` in distributed `package.json` ([4f1890e](https://github.com/tinesoft/generator-ngx-library/commit/4f1890e))
* **template/gulpfile:** add missing $ for documentation output path ([9cebd7f](https://github.com/tinesoft/generator-ngx-library/commit/9cebd7f))


### Features

* **core:** remember `--skip-demo`, `--skip-sample` and `--skip-styles` options in `.yo-rc.json` ([d573cf6](https://github.com/tinesoft/generator-ngx-library/commit/d573cf6))
* **style:** add support for css files ([cbc54f9](https://github.com/tinesoft/generator-ngx-library/commit/cbc54f9)), closes [#131](https://github.com/tinesoft/generator-ngx-library/issues/131)



<a name="5.1.0"></a>
# [5.1.0](https://github.com/tinesoft/generator-ngx-library/compare/v5.0.0...v5.1.0) (2017-11-17)


### Bug Fixes

* **linkedLibraries:** add typescript path mapping for peerDependencies in demo app ([8ad5170](https://github.com/tinesoft/generator-ngx-library/commit/8ad5170))
* **package:** update chalk to version 2.3.0 ([ecd8009](https://github.com/tinesoft/generator-ngx-library/commit/ecd8009)), closes [#108](https://github.com/tinesoft/generator-ngx-library/issues/108)
* **peerDependencies:** correct invalid versions range for `peerDependencies` when packaging library ([fcb2e40](https://github.com/tinesoft/generator-ngx-library/commit/fcb2e40))


### Features

* **hmr:** add `serve:demo-hmr`task to serve demo app with hot module replacement ([7562741](https://github.com/tinesoft/generator-ngx-library/commit/7562741))
* **recipe:** add a recipe about how to customize peerDependencies version range ([7540da5](https://github.com/tinesoft/generator-ngx-library/commit/7540da5))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/tinesoft/generator-ngx-library/compare/v4.5.1...v5.0.0) (2017-11-03)


### Features

* **core:** add support for `Angular 5` and `Angular CLI 1.5.0` ([1837622](https://github.com/tinesoft/generator-ngx-library/commit/1837622))
* **demo:** add `--aot` to `serve:demo` task to speed up incremental rebuilds in development ([dea0a10](https://github.com/tinesoft/generator-ngx-library/commit/dea0a10))
* **demo:** update demo ssr code to align with offcial docs + angular 5 ([d758f33](https://github.com/tinesoft/generator-ngx-library/commit/d758f33))



<a name="4.5.1"></a>
## [4.5.1](https://github.com/tinesoft/generator-ngx-library/compare/v4.5.0...v4.5.1) (2017-11-01)


### Bug Fixes

* **core:** fix generation issue due to only additional packages being installed ([f4c82b0](https://github.com/tinesoft/generator-ngx-library/commit/f4c82b0))
* **demo:** fix demo app not being pushed when deploy task includes building  doc app ([d2a6589](https://github.com/tinesoft/generator-ngx-library/commit/d2a6589))
* **skipDemo:** fix library files being wrongly excluded when providing `skip-demo` option ([0cc0b56](https://github.com/tinesoft/generator-ngx-library/commit/0cc0b56))



<a name="4.5.0"></a>
# [4.5.0](https://github.com/tinesoft/generator-ngx-library/compare/v4.4.0...v4.5.0) (2017-10-31)


### Bug Fixes

* **core:** fix `.yo-rc.json` being  created at wrong location when specifying target folder ([112339e](https://github.com/tinesoft/generator-ngx-library/commit/112339e))
* **core:** fix github repo name not being validated during prompt ([9c92465](https://github.com/tinesoft/generator-ngx-library/commit/9c92465))


### Features

* **core:** allow support for underscore in repo and project names during prompt ([3dd97a7](https://github.com/tinesoft/generator-ngx-library/commit/3dd97a7))
* **greenkeeper:** deactivate `greenkeeper` by default in generator's prompt ([b2252da](https://github.com/tinesoft/generator-ngx-library/commit/b2252da))



<a name="4.4.0"></a>
# [4.4.0](https://github.com/tinesoft/generator-ngx-library/compare/v4.3.0...v4.4.0) (2017-10-28)


### Bug Fixes

* **build:** remove watching of `*.html` files when `--skip-styles` was chosen ([0415dc8](https://github.com/tinesoft/generator-ngx-library/commit/0415dc8))
* **styles:** fix issue in  pattern used to identify scss/sass files ([714f59c](https://github.com/tinesoft/generator-ngx-library/commit/714f59c))


### Features

* **build:** update dev dependencies and greenkeeper exclusions ([532fb5b](https://github.com/tinesoft/generator-ngx-library/commit/532fb5b))
* **build:** update most dev dependencies ([ee9eeec](https://github.com/tinesoft/generator-ngx-library/commit/ee9eeec))
* **core:** add support for additional dependencies ([631c14a](https://github.com/tinesoft/generator-ngx-library/commit/631c14a))
* **core:** allow specifying target folder when running the generator ([3329544](https://github.com/tinesoft/generator-ngx-library/commit/3329544))
* **demo:** update demo app to Angular CLI `1.4.7` ([6fe54b5](https://github.com/tinesoft/generator-ngx-library/commit/6fe54b5))
* **rollup:** update rollup to latest version(`0.50.0`) ([51050c8](https://github.com/tinesoft/generator-ngx-library/commit/51050c8))



<a name="4.3.0"></a>
# [4.3.0](https://github.com/tinesoft/generator-ngx-library/compare/v4.2.0...v4.3.0) (2017-10-09)


### Bug Fixes

* **packaging:** correct wrong "typings" and "es2015" when building for ng v2 ([1824aef](https://github.com/tinesoft/generator-ngx-library/commit/1824aef))


### Features

* **build:** run initial build on `gulp build:watch` ([e3fa3fd](https://github.com/tinesoft/generator-ngx-library/commit/e3fa3fd))
* **scopedLibraries:** add support for scoped libraries creation (i.e [@my](https://github.com/my)-scope/my-lib) ([575c744](https://github.com/tinesoft/generator-ngx-library/commit/575c744)), closes [#100](https://github.com/tinesoft/generator-ngx-library/issues/100)



<a name="4.2.0"></a>
# [4.2.0](https://github.com/tinesoft/generator-ngx-library/compare/v4.1.1...v4.2.0) (2017-10-08)


### Bug Fixes

* **build:** restore rxjs externals in RollupJS config ([776e907](https://github.com/tinesoft/generator-ngx-library/commit/776e907))
* **package:** update yeoman-generator to version 2.0.1 ([c7535b8](https://github.com/tinesoft/generator-ngx-library/commit/c7535b8))


### Features

* **build:** add `build:watch` task to rebuild library on change on `*.ts`, `*.html`, `*.scss` files ([921b3db](https://github.com/tinesoft/generator-ngx-library/commit/921b3db)), closes [#98](https://github.com/tinesoft/generator-ngx-library/issues/98)
* **core:** add support for Appveyor CI (for testing generator on Windows platforms) ([9772d5a](https://github.com/tinesoft/generator-ngx-library/commit/9772d5a))
* **demo:** update demo app favicon ([da525f6](https://github.com/tinesoft/generator-ngx-library/commit/da525f6))



<a name="4.1.1"></a>
## [4.1.1](https://github.com/tinesoft/generator-ngx-library/compare/v4.1.0...v4.1.1) (2017-09-29)


### Bug Fixes

* **core:** update generator  to `chalk 2.1.0` to fix issue when generating on Windows 10 ([f485e01](https://github.com/tinesoft/generator-ngx-library/commit/f485e01)), closes [#89](https://github.com/tinesoft/generator-ngx-library/issues/89)



<a name="4.1.0"></a>
# [4.1.0](https://github.com/tinesoft/generator-ngx-library/compare/v4.0.0...v4.1.0) (2017-09-28)


### Features

* **git:** enforce that commit messages follow angular guideline ([ecb667c](https://github.com/tinesoft/generator-ngx-library/commit/ecb667c))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/tinesoft/generator-ngx-library/compare/v3.3.0...v4.0.0) (2017-09-25)


### Features

* **all:** add `yarn-error.log` to `.gitignore` files ([fbde76b](https://github.com/tinesoft/generator-ngx-library/commit/fbde76b))
* **core:** add generator version in `.yo-rc.json` file ([09cd3e3](https://github.com/tinesoft/generator-ngx-library/commit/09cd3e3))
* **core:** update generator to `yeoman-generator 2.0.0` ([1cc4e21](https://github.com/tinesoft/generator-ngx-library/commit/1cc4e21))
* **demo:** update demo app  to `Angular CLI 1.4.3` ([c00a229](https://github.com/tinesoft/generator-ngx-library/commit/c00a229))
* **demo:** update demo app to `Angular CLI 1.4.1` ([48695f6](https://github.com/tinesoft/generator-ngx-library/commit/48695f6))
* **demo:** update demo app's favicon ([542208f](https://github.com/tinesoft/generator-ngx-library/commit/542208f))
* **generator:** add ability to skip some files/folders when re-running the generator ([98d5185](https://github.com/tinesoft/generator-ngx-library/commit/98d5185))
* **recipe:** add recipe about how to skip certain files/folders when re-launching the generator ([a1ed87d](https://github.com/tinesoft/generator-ngx-library/commit/a1ed87d))
* **recipe:** add recipe about testing universal (server side rendering) ([1165b82](https://github.com/tinesoft/generator-ngx-library/commit/1165b82))
* **skipSample:** add `--skip-sample`option to skip genration of the sample library ([565c1ff](https://github.com/tinesoft/generator-ngx-library/commit/565c1ff))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/tinesoft/generator-ngx-library/compare/v3.2.0...v3.3.0) (2017-09-08)


### Bug Fixes

* **demo:** fix base href for deployed demo app ([f7b1335](https://github.com/tinesoft/generator-ngx-library/commit/f7b1335))
* **doc:** fix path to documentation files generated output ([b0b2eff](https://github.com/tinesoft/generator-ngx-library/commit/b0b2eff))


### Features

* **demo:** add link to library's logo in `README.md`and update style ([2babc46](https://github.com/tinesoft/generator-ngx-library/commit/2babc46))
* **node:** add minimum required node version in `package.json` ([d62f334](https://github.com/tinesoft/generator-ngx-library/commit/d62f334))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/tinesoft/generator-ngx-library/compare/v3.1.1...v3.2.0) (2017-09-05)


### Bug Fixes

* **demo:** add js and associated sourcemap files when targeting angular 2.x.x ([4bb70ab](https://github.com/tinesoft/generator-ngx-library/commit/4bb70ab)), closes [#72](https://github.com/tinesoft/generator-ngx-library/issues/72)
* **demo:** fix navigation header of demo app ([457e7a4](https://github.com/tinesoft/generator-ngx-library/commit/457e7a4))


### Features

* **build:** support for node based resolution and fix rxjs errors related to not exposed modules ([4b66654](https://github.com/tinesoft/generator-ngx-library/commit/4b66654))
* **demo:** add feature modules and setup lazy loading ([c4f88c1](https://github.com/tinesoft/generator-ngx-library/commit/c4f88c1))
* **demo:** update demo app to Angular CLI `1.3.2` ([08a2d59](https://github.com/tinesoft/generator-ngx-library/commit/08a2d59))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/tinesoft/generator-ngx-library/compare/v3.1.0...v3.1.1) (2017-08-26)


### Bug Fixes

* **compodoc:** use `tsconfig.json` file from library source folder (not the one from root folder) ([6801256](https://github.com/tinesoft/generator-ngx-library/commit/6801256))
* **demo:** fix error when consuming the linked library in demo app ([01d58f2](https://github.com/tinesoft/generator-ngx-library/commit/01d58f2)), closes [#70](https://github.com/tinesoft/generator-ngx-library/issues/70)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/tinesoft/generator-ngx-library/compare/v3.0.2...v3.1.0) (2017-08-12)


### Bug Fixes

* **demo:** fix `base-href` used by deployed demo app ([ef8a159](https://github.com/tinesoft/generator-ngx-library/commit/ef8a159))
* **demo:** import 'LibModule' for HeaderComponent tests ([7a2bfde](https://github.com/tinesoft/generator-ngx-library/commit/7a2bfde)), closes [#60](https://github.com/tinesoft/generator-ngx-library/issues/60)
* **demo:** update dependencies in template ([9dc0c0a](https://github.com/tinesoft/generator-ngx-library/commit/9dc0c0a)), closes [#62](https://github.com/tinesoft/generator-ngx-library/issues/62)
* **packaging:** fix wrong bundle(es6 instead of es5) referenced in distributed files's `package.json` when targetting angular >= 4 ([fd0d366](https://github.com/tinesoft/generator-ngx-library/commit/fd0d366)), closes [#65](https://github.com/tinesoft/generator-ngx-library/issues/65)


### Features

* **demo:** update demo application files to `angular/cli[@1](https://github.com/1).3.0` ([da0687f](https://github.com/tinesoft/generator-ngx-library/commit/da0687f))
* **perf:** add `--build-optimizer` when building demo application (sample app shrinked from `808.55kB` to `587.35kB` ! ) ([894c3e8](https://github.com/tinesoft/generator-ngx-library/commit/894c3e8))



<a name="3.0.2"></a>
## [3.0.2](https://github.com/tinesoft/generator-ngx-library/compare/v3.0.1...v3.0.2) (2017-07-31)


### Bug Fixes

* **tests:** fix `tsconfig.spec.json` when targetting Angular 2.x.x (decorator metadat not emitted) ([706440e](https://github.com/tinesoft/generator-ngx-library/commit/706440e))


### Features

* **version:** show generator version at launch, to ease troubleshootings ([e533ca9](https://github.com/tinesoft/generator-ngx-library/commit/e533ca9))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/tinesoft/generator-ngx-library/compare/v3.0.0...v3.0.1) (2017-07-20)


### Bug Fixes

* **npm-package:** fix installation failure on Node v>=8 during `gulp npm-package` phase ([c0a464f](https://github.com/tinesoft/generator-ngx-library/commit/c0a464f)), closes [#52](https://github.com/tinesoft/generator-ngx-library/issues/52)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/tinesoft/generator-ngx-library/compare/v2.5.2...v3.0.0) (2017-07-16)


### Features

* **demo:** automatically install dependencies if missing when first running a demo related task ([bfbabba](https://github.com/tinesoft/generator-ngx-library/commit/bfbabba))
* **demo:** update demo app with example of how to consume the library ([cfc4951](https://github.com/tinesoft/generator-ngx-library/commit/cfc4951))
* **generator:** add `ngPrefix` option for naming components, directives,... and enforce it in `tslint.json` ([fbd35f5](https://github.com/tinesoft/generator-ngx-library/commit/fbd35f5)), closes [#33](https://github.com/tinesoft/generator-ngx-library/issues/33)
* **packageFormat:** add support for [Angular Package Format v4.0](https://goo.gl/AMOU5G) ([c484636](https://github.com/tinesoft/generator-ngx-library/commit/c484636)), closes [#32](https://github.com/tinesoft/generator-ngx-library/issues/32)
* **prompts:** add default keywords to `projectKeywords` option ([54376f3](https://github.com/tinesoft/generator-ngx-library/commit/54376f3))
* **template/travis:** remove custom installation of yarn (0.21.3) in favor of latest ([5884e4c](https://github.com/tinesoft/generator-ngx-library/commit/5884e4c))
* **templates/package.json:** update dev dependencies and `zone.js` (for Angular v4) ([e23b66b](https://github.com/tinesoft/generator-ngx-library/commit/e23b66b))



<a name="2.5.2"></a>
## [2.5.2](https://github.com/tinesoft/generator-ngx-library/compare/v2.5.1...v2.5.2) (2017-06-29)


### Features

* **templates/package.json:** update linting-related dependencies and configuration when targeting angular v4 ([60f8cfd](https://github.com/tinesoft/generator-ngx-library/commit/60f8cfd)), closes [#26](https://github.com/tinesoft/generator-ngx-library/issues/26)



<a name="2.5.1"></a>
## [2.5.1](https://github.com/tinesoft/generator-ngx-library/compare/v2.5.0...v2.5.1) (2017-06-28)


### Bug Fixes

* **resourcesInlining:** fix resources not inlined when building library files (wrong path in `tsconfig-aot.json`) ([86149f0](https://github.com/tinesoft/generator-ngx-library/commit/86149f0)), closes [#28](https://github.com/tinesoft/generator-ngx-library/issues/28)
* **templates/demo:** fix margin in demo's home page ([8bd3e98](https://github.com/tinesoft/generator-ngx-library/commit/8bd3e98))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/tinesoft/generator-ngx-library/compare/v2.4.1...v2.5.0) (2017-06-19)


### Bug Fixes

* **template/gulpfile:** correct indentation for `gulp bundle` task ([ecc7091](https://github.com/tinesoft/generator-ngx-library/commit/ecc7091))
* **template/gulpfile:** fix missing `os` and `exec`dependencies in `gulpfile.js` when not skipping styles-related code generation ([2a2bd56](https://github.com/tinesoft/generator-ngx-library/commit/2a2bd56))


### Features

* **demo/meta:** add meaningful meta data to demo/index.html ([3d65755](https://github.com/tinesoft/generator-ngx-library/commit/3d65755))
* **gulp:** allow loading additional gulp tasks put in `./config/gulp-task/*` folder ([62e2565](https://github.com/tinesoft/generator-ngx-library/commit/62e2565))
* **skipDemo:** add option `--skipDemo` to skip generation of demo app related code ([59c3333](https://github.com/tinesoft/generator-ngx-library/commit/59c3333))



<a name="2.4.1"></a>
## [2.4.1](https://github.com/tinesoft/generator-ngx-library/compare/v2.4.0...v2.4.1) (2017-06-05)



<a name="2.4.0"></a>
# [2.4.0](https://github.com/tinesoft/generator-ngx-library/compare/v2.3.0...v2.4.0) (2017-06-05)


### Bug Fixes

* **template/gulpfile:** remove duplicated 'ngc'  gulp task ([2e93bd3](https://github.com/tinesoft/generator-ngx-library/commit/2e93bd3))


### Features

* **skipStyles:** add `--skip-styles` to skip generation of styles inlining related code ([0d8ac6c](https://github.com/tinesoft/generator-ngx-library/commit/0d8ac6c))
* **template/github:** add github's `ISSUE_TEMPLATE.md` file ([6fb36ed](https://github.com/tinesoft/generator-ngx-library/commit/6fb36ed))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/tinesoft/generator-ngx-library/compare/v2.2.0...v2.3.0) (2017-05-31)


### Features

* **compodoc:** add support for compodoc (awesome documentation tool for your Angular projects) ([52d3f9c](https://github.com/tinesoft/generator-ngx-library/commit/52d3f9c))
* **greenkeeper:** add support for greenkeeper (real-time monitoring and automatic updates for npm dependencies) ([f3136a8](https://github.com/tinesoft/generator-ngx-library/commit/f3136a8))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/tinesoft/generator-ngx-library/compare/v2.1.0...v2.2.0) (2017-05-28)


### Bug Fixes

* **devDependencies:** pin dev dependencies to exact versions to avoid build breakages ([30d8e9c](https://github.com/tinesoft/generator-ngx-library/commit/30d8e9c))
* **LICENSE:** set inception year in LICENSE file ([0e996d4](https://github.com/tinesoft/generator-ngx-library/commit/0e996d4))


### Features

* **tests:** add `karma-jasmine-html-reporter` for tests results output in browser ([cba12cf](https://github.com/tinesoft/generator-ngx-library/commit/cba12cf))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/tinesoft/generator-ngx-library/compare/v2.0.1...v2.1.0) (2017-05-06)


### Features

* **release:** add pre-release checks to ensure library is ready to be released ([b67fd55](https://github.com/tinesoft/generator-ngx-library/commit/b67fd55))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/tinesoft/generator-ngx-library/compare/v2.0.0...v2.0.1) (2017-05-03)


### Bug Fixes

* **peerDependencies:** align some angular and typescript dev dependencies with angular v4+ ([6b7f3cb](https://github.com/tinesoft/generator-ngx-library/commit/6b7f3cb)), closes [#1](https://github.com/tinesoft/generator-ngx-library/issues/1)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/tinesoft/generator-ngx-library/compare/v1.0.1...v2.0.0) (2017-05-01)


### Features

* **all:** migrate to angular ([a2d9a4b](https://github.com/tinesoft/generator-ngx-library/commit/a2d9a4b))


### BREAKING CHANGES

* **all:** - rename package from `generator-ng-plugin` to `generator-ngx-library`
- migrate from AngularJS to Angular
- migrate from `Grunt` to `Gulp`



<a name="1.0.1"></a>
## [1.0.1](https://github.com/tinesoft/generator-ngx-library/compare/42c574e...v1.0.1) (2015-09-24)


### Bug Fixes

* **coveralls:** fix integration of code coverage tool(coveralls) in the build system ([7d40c70](https://github.com/tinesoft/generator-ngx-library/commit/7d40c70))


### Features

* **all:** initial commit ([42c574e](https://github.com/tinesoft/generator-ngx-library/commit/42c574e))



