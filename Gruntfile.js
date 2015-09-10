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
        options: {
          reporter: 'spec',
          coveralls:true
        },
        all: ['test/test-app.js']
        }
    });

    grunt.registerTask('test', [
        'jshint:all',
        'mochacov'
    ]);

    // Default task
    grunt.registerTask('default', ['test']);
};
