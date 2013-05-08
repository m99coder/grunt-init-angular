
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
  , lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

// private

function mountFolder (connect, dir) {
  return connect.static(path.resolve(dir))
}

function lrAppServer (connect) {
  return [lrSnippet, mountFolder(connect, 'www')]
}

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
      options: {
        jshintrc: '.jshintrc'
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['lib/client/{,*/}*.js', 'lib/server/{,*/}*.js']
      },
      test: {
        src: 'test/specs/{,*/}*.js'
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
      options: {
        baseUrl: 'lib/client/',
        cjsTranslate: true,
        deps: [
          'almond',
          'es5',
          'modernizr'
        ],
        mainConfigFile: 'lib/client/config.js',
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
        wrap: {
          startFile: '.grunt/requirejs/header.txt',
          endFile: '.grunt/requirejs/footer.txt'
        },
        onBuildRead: function (moduleName, pathname, contents) {
          pathname = inflect.camelize(path.basename(path.dirname(pathname)), false)
          return contents.replace(/__dirname/g, pathname)
        }
      },
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
    jasmine: {
      all: {
        options: {
          outfile: 'test/_index.html',
          template: 'test/index.html'
        }
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
        options: {
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'www/',
          src: '*.html',
          dest: 'www/'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          src: 'www/{,*/}*.{png,jpg,jpeg}',
          dest: '.'
        }]
      }
    },
    connect: {
      app: {
        options: {
          port: 3000,
          middleware: lrAppServer
        }
      },
      test: {
        options: {
          port: 3001,
          base: './'
        }
      }
    },
    open: {
      test: {
        path: 'http://localhost:<%=connect.test.options.port%>/test'
      },
      app: {
        path: 'http://localhost:<%=connect.app.options.port%>'
      }
    },
    watch: {
      grunt: {
        files: 'Gruntfile.js',
        tasks: 'jshint:grunt',
        options: {
          nocase: true
        }
      },
      app: {
        files: ['bower.json', 'lib/client/{,*/}*',  'lib/server/{,*/}*'],
        tasks: 'build'
      },
      test: {
        files: ['test/index.html', 'test/specs/{,*/}*'],
        tasks: ['jshint:test', 'test']
      },
      www: {
        files: 'www/**',
        tasks: 'livereload'
      }
    }
  }

  // discover client AMD packages for requirejs

  configureRequirejs(config.requirejs.options, 'lib/client')

  // initialise grunt

  grunt.initConfig(config)

  // ~ hack for livereload - see https://github.com/gruntjs/grunt-contrib-watch/issues/59

  grunt.renameTask('regarde', 'watch');

  // Lint task

  grunt.registerTask('lint', 'jshint')

  // Test task

  grunt.registerTask('test', 'jasmine')

  // Min task

  grunt.registerTask('min', ['cssmin', 'htmlmin', 'imagemin'])

  // Build tasks

  grunt.registerTask('build', function (target) {
    if (target === 'prod') {
      grunt.task.run(['lint', 'less', 'copy', 'requirejs:prod', 'min', 'test'])
    }
    else {
      grunt.task.run(['lint', 'less', 'copy', 'requirejs:dev', 'test'])
    }
  })
  grunt.registerTask('package', 'build:prod')

  // Server task

  grunt.registerTask('server', function (target) {
    grunt.task.run('livereload-start')
    if (!target || target === 'app') {
      grunt.task.run('connect:app')
    }
    if (!target || target === 'test') {
      grunt.task.run('connect:test')
    }
  })

  // Workflow tasks

  grunt.registerTask('run', function (target) {
    var build = 'build:' + (target === 'prod' ? target : 'dev')

    // redefine watch.app.tasks
    grunt.config.set('watch.app.tasks', build)

    grunt.task.run(['clean', build, 'server', 'open', 'watch'])
  })
  grunt.registerTask('dev', 'run:dev')
  grunt.registerTask('stage', 'run:prod')

  // Default task

  grunt.registerTask('default', 'build')

  // Task aliases

  grunt.registerTask('c', 'clean')
  grunt.registerTask('l', 'lint')
  grunt.registerTask('t', 'test')
  grunt.registerTask('b', 'build')
  grunt.registerTask('p', 'package')
  grunt.registerTask('r', 'run')
  grunt.registerTask('d', 'dev')
  grunt.registerTask('s', 'stage')

}