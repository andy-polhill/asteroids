/*
 * grunt-spec-check d
 * https://github.com/andypolhill/grunt-spec-check
 *
 * Copyright (c) 2015 Andrew Polhill
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    dirs: {
      all_tested_spec_format: 'test/fixtures/all_tested_spec_format'
    },

    // Configuration to be run (and then tested).
    specCheck: {
      default_all_tested: {
        options: {
          testDir: '<%= dirs.all_tested_spec_format %>/test',
          baseDir: '<%= dirs.all_tested_spec_format %>/lib'
        },
        files: {
          src: ['<%= dirs.all_tested_spec_format %>/lib/**/*.js']
        }
      },
      default_missing_test: {
        options: {
          testDir: 'test/fixtures/missing_test_spec_format/test',
          baseDir: 'test/fixtures/missing_test_spec_format/lib'
        },
        files: {
          src: ['test/fixtures/missing_test_spec_format/lib/**/*.js']
        }
      },
      default_all_tested_test_format: {
        options: {
          convention: 'Test.js',
          testDir: 'test/fixtures/all_tested_test_format/test',
          baseDir: 'test/fixtures/all_tested_test_format/lib'
        },
        files: {
          src: ['test/fixtures/all_tested_test_format/lib/**/*.js']
        }
      },
      default_all_tested_sub_extension_format: {
        options: {
          convention: '.spec.js',
          testDir: 'test/fixtures/all_tested_sub_extension_format/test',
          baseDir: 'test/fixtures/all_tested_sub_extension_format/lib',

        },
        files: {
          src: ['test/fixtures/all_tested_sub_extension_format/lib/**/*.js']
        }
      },
      warn_severity_missing_test: {
        options: {
          testDir: 'test/fixtures/missing_test_spec_format/test',
          baseDir: 'test/fixtures/missing_test_spec_format/lib',
          severity: 'warn'
        },
        files: {
          src: ['test/fixtures/missing_test_spec_format/lib/**/*.js']
        }
      },
      default_individual_tested_file: {
        options: {
          testDir: 'test/fixtures/all_tested_spec_format/test',
          baseDir: 'test/fixtures/all_tested_spec_format/lib',

        },
        files: {
          src: ['test/fixtures/all_tested_spec_format/lib/tested.js']
        }
      },
      default_exclude_missing_test: {
        options: {
          testDir: 'test/fixtures/missing_test_spec_format/test',
          baseDir: 'test/fixtures/missing_test_spec_format/lib',
          severity: 'warn'
        },
        cwd: 'test/fixtures/missing_test_spec_format/lib',
        expand: true,
        filter: 'isFile',
        src: [
          '**/*.js',
          '!another.js',
        ]
      },
      invalid_severity: {
        options: {
          severity: 'log',
          baseDir: '',
          testDir: 'test/fixtures/missing_test_spec_format/test'
        },
        files: {
          src: ['test/fixtures/missing_test_spec_format/lib/**/*.js']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*-test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['jshint', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
