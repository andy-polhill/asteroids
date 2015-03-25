'use strict';

var exec = require('child_process').exec;

/*  FIXME:
 *  I don't like the appraoch of using exec and then checking the output,
 *  however testing grunt tasks appears to be quite tricky if you are not directly
 *  modifying files. The checking of grunt text output may prove brittle, you also
 * cannot generate coverage reports or reliably debug the code.
 */

exports.specCheck = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_all_tested: function(test) {
    exec('grunt specCheck:default_all_tested', {}, function(error, stdout) {
      test.ok(stdout.indexOf('Fatal error') === -1, 'It should not display an error when all files have specs');
      test.ok(stdout.indexOf('2 Files with corresponding test cases') > 0,
          'It should output the number of files with tests');
      test.done();
    });
  },
  default_missing_test: function(test) {
    test.expect(2);
    exec('grunt specCheck:default_missing_test', {}, function(error, stdout) {
      test.ok(stdout.indexOf('Fatal error') > 0, 'It should display an error when test cases are missing');
      test.ok(stdout.indexOf('test/fixtures/missing_test_spec_format/lib/another.js') > 0,
          'It should list files that do not have test cases');
      test.done();
    });
  },
  default_all_tested_test_format: function(test) {
    test.expect(1);
    exec('grunt specCheck:default_all_tested_test_format', {}, function(error, stdout) {
      test.ok(stdout.indexOf('2 Files with corresponding test cases') > 0,
          'It should output the number of files with tests');
      test.done();
    });
  },
  default_all_tested_sub_extension_format: function(test) {
    test.expect(1);
    exec('grunt specCheck:default_all_tested_sub_extension_format ', {}, function(error, stdout) {
      test.ok(stdout.indexOf('2 Files with corresponding test cases') > 0,
          'It should output the number of files with tests');
      test.done();
    });
  },
  warn_severity_missing_test: function(test) {
    test.expect(2);
    exec('grunt specCheck:warn_severity_missing_test', {}, function(error, stdout) {
      test.ok(stdout.indexOf('Warning') > 0, 'It should display an error when test cases are missing');
      test.ok(stdout.indexOf('test/fixtures/missing_test_spec_format/lib/another.js') > 0,
          'It should list files that do not have test cases');
      test.done();
    });
  },
  default_individual_tested_file: function(test) {
    test.expect(1);
    exec('grunt specCheck:default_individual_tested_file', {}, function(error, stdout) {
      test.ok(stdout.indexOf('1 File with corresponding test case') > 0,
          'It should output the number of files with tests');
      test.done();
    });
  },
  default_excluded_file: function(test) {
    test.expect(2);
    exec('grunt specCheck:default_all_tested', {}, function(error, stdout) {
      test.ok(stdout.indexOf('Fatal error') === -1, 'It should not display an error when all files have specs');
      test.ok(stdout.indexOf('2 Files with corresponding test cases') > 0,
          'It should output the number of files with tests');
      test.done();
    });
  },
  invalid_severity: function(test) {
    test.expect(2);
    exec('grunt specCheck:invalid_severity', {}, function(error, stdout) {
      test.ok(stdout.indexOf('Fatal error') > 0, 'It should throw a fatal warning when severity is invalid');
      test.ok(stdout.indexOf('The provided severity option is invalid') > 0,
          'It should throw a fatal warning when severity is invalid');
      test.done();
    });
  }


};
