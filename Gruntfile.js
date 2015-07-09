'use strict';


module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Load Grunt tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'test/test-load.js', 
                'test/test-creation.js'
                ]
        },
        mochaTest: {
            unit: {
                src: [
                'test/test-app.js'
                ]
            }
        }
    });

    grunt.registerTask('test', [
        'jshint:all',
        'mochaTest:unit'
    ]);

    // Default task
    grunt.registerTask('default', ['test']);
};
