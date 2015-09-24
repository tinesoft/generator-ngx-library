'use strict';


module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Load Grunt tasks
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cov');

    grunt.initConfig({
        bump: {
          options: {
            files: ['package.json'],
            commit: true,
            commitMessage: 'chore(release): v%VERSION%',
            commitFiles: ['-a'],
            createTag: true,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: true,
            pushTo: 'origin'
          }
        },  
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/index.js',
                'test/test-app.js'
                ]
        },
      mochacov: {
        coverage: {
          options: {
            coveralls: true
          }
        },
        test: {
          options: {
            reporter: 'spec'
          }
        },
        options: {
          files: 'test/test-app.js'
        }
      }
    });

    grunt.registerTask('test', [
        'jshint:all',
        'mochacov:test'
    ]);

    // Default task
    grunt.registerTask('default', ['test']);
};
