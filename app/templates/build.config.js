/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development,  the `compile_dir_demo` folder is where our demo resides once it's
   * completely built, and the `compile_dir` for our main files.
   */
  build_dir: 'build',
  coverage_dir: 'coverage',
  compile_dir: 'dist',
  compile_dir_demo: 'dist/demo',

  /**
   * This is a collection of file patterns that refer to our demo code (the
   * stuff in `demo/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests.`html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * demo's unit tests.
   */
  src_demo_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', 'demo/**/*.js', '!demo/**/*.spec.js', '!demo/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    
    stpl: [ 'src/**/*.tpl.html' ],

    html: [ 'demo/index.html'],
    less: 'demo/less/demo.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'bower_components/angular-mocks/angular-mocks.js'
    ],
    css: [
      'bower_components/juxtapose/build/css/juxtapose.css'
    ]
  },

  /**
   * This is the same as `src_demo_files`, except it contains patterns that
   * reference vendor code (`bower_components/`) that we need to place into the build
   * process somewhere. While the `src_demo_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * demoropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our demo.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our demo's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/google-code-prettify/src/prettify.js',
      'bower_components/juxtapose/build/js/juxtapose.js'
    ],
    css: [
      'bower_components/google-code-prettify/src/prettify.css',
      'bower_components/juxtapose/build/css/juxtapose.css'
    ],
    assets: [
    ]
  },
};
