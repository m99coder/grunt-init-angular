
/*
 * grunt-init-angular
 * https://github.com/kaheglar/grunt-init-angular
 *
 * Copyright (c) 2013 kaheglar
 * Licensed under the MIT license.
 */

'use strict';

// import

var _         = require('underscore')
  , grunt     = require('grunt')
  , inflect   = require('i')()
  , path      = require('path')
  , matchdep  = require('matchdep')

// private

function configureRequirejs (config, baseDir) {
  var mainFiles = grunt.file.expand(path.normalize(baseDir + '/*/main.js'))
    , packages, includes, requires;

  // discover packages from files system
  packages = _.map(mainFiles, function(file) {
    var location = path.basename(path.dirname(file))
      , name = location.replace(/\.+/g, '/')

    return {
      name: name,
      location: location
    }
  })

  // derive includes from packages
  includes =  _.pluck(packages, 'name')
  // ensure "./main" is included/required last
  includes.push('./main')

  // derive requires from inculdes
  requires = includes

  // add new options to the configuration
  _.extend(config, {
    include: includes,
    insertRequire: requires,
    packages: packages
  })
}

// exports

module.exports = function(grunt) {

  // load external tasks

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  //  grunt configuration

  var config = {
    clean: {
      www: 'www/*'
    },
    jshint: {
      app: {
        src: ['lib/client/{,*/}*.js', 'lib/server/{,*/}*.js']
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    less: {
      options: {
        paths: ['lib/client', 'bower_components/bootstrap/less']
      },
      dev: {
        files: [
          {
            src: ['lib/client/*/style.less', 'lib/client/*/style.responsive.less'],
            dest: 'www/style.css'
          }
        ]
      }
    },
    requirejs: {
      dev: {
        options: {
          optimize: 'none',
          useSourceUrl: true
        }
      },
      prod: {
        options: {
          optimize: 'uglify2',
          generateSourceMaps: true
        }
      },
      options: {
        baseUrl: 'lib/client/',
        cjsTranslate: true,
        deps: [
          'almond',
          'es5',
          'modernizr'
        ],
        mainConfigFile: 'config/requirejs/config.js',
        name: 'almond',
        out: 'www/main.js',
        paths: {
          almond: '../../bower_components/almond/almond',
          es5: '../../bower_components/es5-shim/es5-shim',
          modernizr: '../../bower_components/modernizr/modernizr',
          text: '../../bower_components/text/text'
        },
        preserveLicenseComments: false,
        useStrict: true,
        onBuildRead: function (moduleName, pathname, contents) {
          pathname = inflect.camelize(path.basename(path.dirname(pathname)), false)
          return contents.replace(/__dirname/g, pathname)
        }
      }
    },
    copy: {
      www: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'lib/client/*.html',
            dest: 'www/'
          },
          {
            expand: true,
            flatten: true,
            src: 'bower_components/bootstrap/img/*',
            dest: 'www/img/'
          }
        ]
      }
    },
    karma: {
      // continuous integration mode for the build: run tests once in PhantomJS browser.
      continuous: {
        singleRun: true
      },
      // start karma server (the watch task will run the tests when files change)
      unit: {
        background: true
      },
      options: {
        configFile: 'config/karma/config.js'
      }
    },
    cssmin: {
      www: {
        files: {
          'www/style.css': 'www/style.css'
        }
      }
    },
    htmlmin: {
      www: {
        files: [{
          expand: true,
          cwd: 'www/',
          src: '*.html',
          dest: 'www/'
        }],
        options: {
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        }
      }
    },
    imagemin: {
      www: {
        files: [{
          expand: true,
          src: 'www/{,*/}*.{png,jpg,jpeg}',
          dest: '.'
        }]
      }
    },
    open: {
      livereload: {
        path: 'http://localhost:3000'
      }
    },
    watch: {
      app: {
        files: ['lib/client/{,*/}*', 'lib/server/{,*/}*'],
        tasks: ['clear', 'dev-build', 'karma:unit:run'],
        options: {
          livereload: true
        }
      },
      config: {
        files: ['*.json', '.*', 'config/{,*/}*'],
        tasks: 'warn'
      },
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['clear', 'jshint:grunt'],
        options: {
          nocase: true
        }
      }
    }
  }

  // discover client AMD packages for requirejs

  configureRequirejs(config.requirejs.options, 'lib/client')

  // initialise grunt

  grunt.initConfig(config)

  // Lint task

  grunt.registerTask('lint', 'jshint')

  // Test task

  grunt.registerTask('test', 'karma:continuous')
  grunt.registerTask('unit', 'karma:unit')

  // Min task

  grunt.registerTask('min', ['cssmin', 'htmlmin', 'imagemin'])

  // Build tasks

  grunt.registerTask('build', ['lint', 'less', 'copy', 'requirejs:prod', 'min'])
  grunt.registerTask('dev-build', ['lint', 'less', 'copy', 'requirejs:dev'])
  grunt.registerTask('package', ['build', 'test'])

  // Server task

  grunt.registerTask('server', ['livereload-start', 'connect:livereload'])

  // Workflow tasks

  grunt.registerTask('dev', ['clean', 'dev-build', 'unit', 'server', 'open', 'watch'])

  // Kill task

  grunt.registerTask('warn', function () {
    grunt.fail.warning('The configuration file has changed; you will need to restart grunt and/or reinstall dependencies.')
  })

  // Default task

  grunt.registerTask('default', ['build', 'test'])

  // Task aliases

  grunt.registerTask('c', 'clean')
  grunt.registerTask('l', 'lint')
  grunt.registerTask('t', 'test')
  grunt.registerTask('b', 'build')
  grunt.registerTask('p', 'package')
  grunt.registerTask('d', 'dev')

}