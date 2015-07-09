module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-html2js');


  /**
   * Load in our build configuration file.
   */
  var userConfig = require( './build.config.js' );

  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * The banner is the comment that is placed at the top of our compiled 
     * source files. It is first processed as a Grunt template, where the `<%%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner: 
        '/**\n' +
        ' * <%%= pkg.name %> - v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%%= grunt.template.today("yyyy") %> <%%= pkg.author.name %>\n' +
        ' * Licensed <%%= pkg.license %>\n' +
        ' */\n'
    },

    /**
     * Creates a changelog on a new version.
     */
    changelog: {
      options: {
        dest: 'CHANGELOG.md',
        template: 'changelog.tpl'
      }
    },

    /**
     * Increments the version number, etc.
     */
    bump: {
      options: {
        files: [
          "package.json", 
          "bower.json"
        ],
        commit: true,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: [
          "-a"
        ],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin'
      }
    },    
    /**
     * grunt plugin to easily version and deploy built code.
     */
    buildcontrol: {
      options: {
        dir: 'dist/demo',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      ghpages: {
        options: {
          remote: 'git@github.com:<%= githubUsername %>/<%= projectName %>.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../../',
          branch: 'dist/demo'
        }
      }
    },

    /**
     * The directories to delete when `grunt clean` is executed.
     */
    clean: [ 
      '<%%= build_dir %>', 
      '<%%= compile_dir %>'
    ],

    /**
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) and javascripts into
     * `build_dir`, and then to copy the assets to `compile_dir_demo`.
     */
    copy: {
      build_demo_assets: {
        files: [
          { 
            src: [ '**' ],
            dest: '<%%= build_dir %>/assets/',
            cwd: 'demo/assets',
            expand: true
          }
       ]   
      },
      build_vendor_assets: {
        files: [
          { 
            src: [ '<%%= vendor_files.assets %>' ],
            dest: '<%%= build_dir %>/assets/',
            cwd: '.',
            expand: true,
            flatten: true
          }
       ]   
      },
      build_demojs: {
        files: [
          {
            src: [ '<%%= src_demo_files.js %>' ],
            dest: '<%%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_vendorjs: {
        files: [
          {
            src: [ '<%%= vendor_files.js %>' ],
            dest: '<%%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_vendorcss: {
        files: [
          {
            src: [ '<%%= vendor_files.css %>' ],
            dest: '<%%= build_dir %>/',
            cwd: '.',
            expand: true
          },
          {
            src: [ '<%%= vendor_files.css %>' ],
            dest: '<%%= compile_dir_demo %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile_assets: {
        files: [
          {
            src: [ '**' ],
            dest: '<%%= compile_dir_demo %>/assets',
            cwd: '<%%= build_dir %>/assets',
            expand: true
          }
        ]
      }
    },

    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      /**
       * The `build_css` target concatenates compiled CSS and vendor CSS
       * together.
       */
      build_css: {
        src: [
          '<%%= vendor_files.css %>',
          '<%%= build_dir %>/assets/<%%= pkg.name %>-demo.css'
        ],
        dest: '<%%= build_dir %>/assets/<%%= pkg.name %>-demo.css'
      },
      /**
       * The `compile_js_demo` target is the concatenation of our demo application source
       * code and all specified vendor source code into a single file.
       */
      compile_js_demo: {
        options: {
          banner: '<%%= meta.banner %>'
        },
        src: [ 
          '<%%= vendor_files.js %>', 
          'module.prefix', 
          '<%%= build_dir %>/src/**/*.js', 
          '<%%= build_dir %>/demo/**/*.js',
          'module.suffix' 
        ],
        dest: '<%%= compile_dir_demo %>/assets/<%%= pkg.name %>-demo.js'
      },

      /**
       * The `compile_js_src` target is the concatenation of our main application source
       * code and the banner into a single file.
       */
      compile_js_src: {
        options: {
          banner: '<%%= meta.banner %>'
        },
        src: [ 
          'module.prefix', 
          '<%%= build_dir %>/src/**/*.js', 
          '<%%= html2js.src.dest %>', 
          'module.suffix' 
        ],
        dest: '<%%= compile_dir %>/<%%= pkg.name %>.js'
      }
    },

    /**
     * `ng-annotate` annotates the sources before minifying. That is, it allows us
     * to code without the array syntax.
     */
    ngAnnotate: {
      compile: {
        files: [
          {
            src: [ '<%%= src_demo_files.js %>' ],
            cwd: '<%%= build_dir %>',
            dest: '<%%= build_dir %>',
            expand: true
          }
        ]
      }
    },

    /**
     * Minify the sources!
     */
    uglify: {
      compile: {
        options: {
          banner: '<%%= meta.banner %>',
          sourceMap: 'true'
        },
        files: {
          '<%%= compile_dir %>/<%%= pkg.name %>.min.js': '<%%= concat.compile_js_src.dest %>',
          '<%%= compile_dir_demo %>/assets/<%%= pkg.name %>-demo.js': '<%%= concat.compile_js_demo.dest %>'
        }
      }
    },

    /**
     * `grunt-contrib-less` handles our LESS compilation and uglification automatically.
     * Only our `main.less` file is included in compilation; all other files
     * must be imported from this file.
     */
    less: {
      build: {
        files: {
          '<%%= build_dir %>/assets/<%%= pkg.name %>-demo.css': '<%%= src_demo_files.less %>'
        }
      },
      compile: {
        files: {
          '<%%= build_dir %>/assets/<%%= pkg.name %>-demo.css': '<%%= src_demo_files.less %>'
        },
        options: {
          cleancss: true,
          compress: true
        }
      }
    },

    /**
     * `jshint` defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in `options`. But we can also
     * specify exclusionary patterns by prefixing them with an exclamation
     * point (!); this is useful when code comes from a third party but is
     * nonetheless inside `demo/`.
     */
    jshint: {
      src: [ 
        '<%%= src_demo_files.js %>'
      ],
      test: [
        '<%%= src_demo_files.jsunit %>'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    },

    /**
     * HTML2JS is a Grunt plugin that takes all of your template files and
     * places them into JavaScript files as strings that are added to
     * AngularJS's template cache. This means that the templates too become
     * part of the initial payload as one JavaScript file. Neat!
     */
    html2js: {
      /**
       * These are the templates from `src/`.
       */
      src: {
        options: {
          base: 'src'
        },
        src: [ '<%%= src_demo_files.stpl %>' ],
        dest: '<%%= build_dir %>/templates-src.js'
      }
    },

    /**
     * The Karma configurations.
     */
    karma: {
      options: {
        configFile: '<%%= build_dir %>/karma-unit.js'
      },
      unit: {
        port: 9019,
        background: true
      },
      continuous: {
        singleRun: true
      }
    },

    /**
     * The `index` task compiles the `index.html` file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {

      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: '<%%= build_dir %>',
        src: [
          '<%%= vendor_files.js %>',
          '<%%= html2js.src.dest %>',
          '<%%= build_dir %>/src/**/*.js',
          '<%%= build_dir %>/demo/**/*.js',
          '<%%= vendor_files.css %>',
          '<%%= build_dir %>/assets/<%%= pkg.name %>-demo.css'
        ],
        lr: [ 'http://localhost:35729/livereload.js' ]
      },
      
      /**
       * When it is time to have a completely compiled demo application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      compile: {
        dir: '<%%= compile_dir_demo %>',
        src: [
          '<%%= concat.compile_js_demo.dest %>',
          '<%%= vendor_files.css %>',
          '<%%= build_dir %>/assets/<%%= pkg.name %>-demo.css'
        ],
        lr: []  // we don't want to include livereload on compile
      }
    },

    /**
     * This task compiles the karma template so that changes to its file array
     * don't have to be managed manually.
     */
    karmaconfig: {
      unit: {
        dir: '<%%= build_dir %>',
        src: [ 
          '<%%= vendor_files.js %>',
          '<%%= html2js.src.dest %>',
          '<%%= test_files.js %>',
          '<%%= test_files.css %>'
        ]
      }
    },

    /**
     * And for rapid development, we have a watch set up that checks to see if
     * any of the files listed below change, and then to execute the listed 
     * tasks when they do. This just saves us from having to type "grunt" into
     * the command-line every time we want to see what we're working on; we can
     * instead just leave "grunt watch" running in a background terminal. Set it
     * and forget it, as Ron Popeil used to tell us.
     *
     * But we don't need the same thing to hdemoen for all the files. 
     */
    delta: {
      /**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729, which your browser
       * plugin should auto-detect.
       */
      options: {
        livereload: true
      },

      /**
       * When the Gruntfile changes, we just want to lint it. In fact, when
       * your Gruntfile changes, it will automatically be reloaded!
       */
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [ 'jshint:gruntfile' ],
        options: {
          livereload: false
        }
      },

      /**
       * When our JavaScript source files change, we want to run lint them and
       * run our unit tests.
       */
      jssrc: {
        files: [ 
          '<%%= src_demo_files.js %>'
        ],
        tasks: [ 'jshint:src', 'karma:unit:run', 'copy:build_demojs' ]
      },

      /**
       * When assets are changed, copy them. Note that this will *not* copy new
       * files, so this is probably not very useful.
       */
      assets: {
        files: [ 
          'demo/assets/**/*'
        ],
        tasks: [ 'copy:build_demo_assets', 'copy:build_vendor_assets' ]
      },

      /**
       * When index.html changes, we need to compile it.
       */
      html: {
        files: [ '<%%= src_demo_files.html %>' ],
        tasks: [ 'index:build']
      },

      /**
       * When our templates change, we only rewrite the template cache.
       */
      tpls: {
        files: [ 
          '<%%= src_demo_files.stpl %>'
        ],
        tasks: [ 'html2js' ]
      },

      /**
       * When the CSS files change, we need to compile and minify them.
       */
      less: {
        files: [ 'demo/**/*.less' ],
        tasks: [ 'less:build' ]
      },

      /**
       * When a JavaScript unit test file changes, we only want to lint it and
       * run the unit tests. We don't want to do any live reloading.
       */
      jsunit: {
        files: [
          '<%%= src_demo_files.jsunit %>'
        ],
        tasks: [ 'jshint:test', 'karma:unit:run' ],
        options: {
          livereload: false
        }
      }
    }
  };

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build', 'compile' ] );

  /**
   * The `build` task gets your demo ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    'clean', 'html2js', 'jshint', 'less:build',
    'concat:build_css', 'copy:build_demo_assets', 'copy:build_vendor_assets',
    'copy:build_demojs', 'copy:build_vendorjs','copy:build_vendorcss', 'index:build', 'karmaconfig',
    'karma:continuous' 
  ]);

  /**
   * The `compile` task gets your demo ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask( 'compile', [
    'less:compile', 'copy:compile_assets', 'ngAnnotate', 'concat:compile_js_src','concat:compile_js_demo', 'uglify', 'index:compile'
  ]);

  /**
   * A utility function to get all demo JavaScript sources.
   */
  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  /**
   * A utility function to get all demo CSS sources.
   */
  function filterForCSS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  }

  /** 
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir_demo')+')\/', 'g' );
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var lrFile = this.data.lr; // get the livereload file if it exists for this task

    grunt.file.copy('demo/index.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            lr: lrFile, // pass the livereload file
            version: grunt.config( 'pkg.version' ),
            description: grunt.config( 'pkg.description' )
          }
        });
      }
    });
  });

  /**
   * In order to avoid having to specify manually the files needed for karma to
   * run, we use grunt to manage the list for us. The `karma/*` files are
   * compiled as grunt templates for use by Karma. Yay!
   */
  grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
    var jsFiles = filterForJS( this.filesSrc );
    var cssFiles = filterForCSS( this.filesSrc );
    
    grunt.file.copy( 'karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles
          }
        });
      }
    });
  });

};
