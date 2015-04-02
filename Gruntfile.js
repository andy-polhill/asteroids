'use strict';

module.exports = function(grunt) {


  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          base: './',
          livereload: true,
          keepalive: true,
          open: 'http://localhost:9000/index.html'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'asteroids.js': ['js/**/*.js'],
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['browserify', 'connect:server']);

};
