/*
 * grunt-spec-check
 * https://github.com/andypolhill/grunt-spec-check
 *
 * Copyright (c) 2015 Andrew Polhill
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('specCheck', 'Find and list JavaScript files that do not have corresponding specs', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      convention: 'Spec.js',
      severity: 'fatal',
      baseDir: 'lib',
      testDir: 'test'
    });

    var fileCount = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        grunt.log.debug('Searching spec for: ' + filepath);
        //var testFilepath = filepath.replace('.js', options.convention); //convention
        var testFilepath = filepath.replace(options.baseDir, options.testDir).replace('.js', options.convention);

        if (grunt.file.exists(testFilepath) && grunt.file.isFile(testFilepath)) {
          fileCount++;
          grunt.log.debug('Spec found for: ' + filepath);
          return false;
        } else {
          grunt.log.warn('No spec found for: ' + filepath);
          grunt.log.debug('Looking for spec at: ' + testFilepath);
          return true;
        }
      });

      if(src.length > 0) {
        if(typeof grunt.fail[options.severity] === 'function') {
          grunt.fail[options.severity]('Some files did not have corresponding test cases');
        } else {
          grunt.fail.fatal('The provided severity option is invalid: ' + options.severity);
        }
      } else {
        var fileStr = ' File' + grunt.util.pluralize(fileCount, '/s');
        var pluralStr = 'case' + grunt.util.pluralize(fileCount, '/s');
        grunt.log.ok(fileCount + fileStr +  ' with corresponding test ' + pluralStr);
      }

    });
  });
};
