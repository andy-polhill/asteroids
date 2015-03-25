# grunt-spec-check

[![Build Status](https://travis-ci.org/thatguynamedandy/grunt-spec-check.svg)](https://travis-ci.org/thatguynamedandy/grunt-spec-check)

> Find and list JavaScript files that do not have corresponding specs / tests

This is a simple task to help find untested files. Code coverage tools like [Istanbul](https://gotwarlost.github.io/istanbul/)
are excellent for generating code coverage reports, however they generally do not
alert you to files which are untested. This task will simply iterate through each
file and check that there is a corresponding test case. The task can be configured
to fail the build or just provide warnings, depending on how strict you want to be.

The task will not in anyway run the JavaScript files or check that the test case even
does anything. It is a simple task to complement coverage tools by letting you know
which files are untested.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-spec-check --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-spec-check');
```

## The "specCheck" task

### Overview
In your project's Gruntfile, add a section named `specCheck` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  specCheck: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.baseDir
Type: `String`
Default value: `/lib`

A string value that corresponds to the location of the scripts that should be tested. When
searching for a spec this section of the filepath is replaced with the value
specified for testDir

#### options.testDir
Type: `String`
Default value: `/test`

A string value that corresponds to the location of your test files. It is assumed
that the directory structure of your test files matches that of your tested files.

#### options.severity
Type: `String`
Default value: `'fatal'`

A string value that determines the severity of the failure.
Valid options are `'fatal'` (fails build) and `'warn'`

#### options.convention
Type: `String`
Default value: `'Spec.js'`

A string value that corresponds to the convention for naming your test files.
The default is the Jasmine convention where `'file.js`' is tested by `'fileSpec.js`'

The task works by replacing `'.js`' with the value provided here. So:
- `'.spec.js'` : `file.js => file.spec.js`
- `'Test.js'` : `file.js`' => `'fileTest.js`

### Usage Examples

#### Default Options
In this example, we check for corresponding test cases for all JavaScript files,
and throw a fatal warning if any test cases are missing.

```js
grunt.initConfig({
  specCheck: {
    files: {
      src: ["lib/**/*.js"]
    },
  },
});
```

#### Custom Options
In this example, we check for corresponding test cases for all JavaScript files,
but we exclude any debug files. Our test naming convention is to use the term Test
instead of Spec, and we only want to list untested files and not fail the build.
We are also using template properties to cut down on repeated file paths.


```js
grunt.initConfig({
  app: {
    'tests': 'src/test/resources/scripts',
    'scripts': 'src/main/resources/scripts'
  },
  specCheck: {
    options: {
      convention: "Test.js"
      severity: "warn",
      testDir: "<%= app.scripts %>",
      baseDir: "<%= app.tests %>"
    }
    files: {
      src: [
        "<%= app.scripts %>/**/*.js",
        "!<%= app.scripts %>/**/*debug.js",
      ]
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
