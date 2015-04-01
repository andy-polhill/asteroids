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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['connect:server']);

};
