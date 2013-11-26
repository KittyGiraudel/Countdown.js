'use strict';

module.exports = function(grunt) {

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: 'countdown.js',
      options: {
        specs: 'tests/Countdown.js',
        keepRunner: true
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'countdown.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    connect: {
      test: {
        options: {
          port: '8234',
          hostname:'*',
          keepalive: true
        }
      }
    },

    uglify: {
      options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: false
      },
      target: {
          // Grab the main.js and make the main.min.js, simple as hell
          files: {
              'countdown.min.js': ['countdown.js']
          }
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true
        }
      }
    },

    watch: {
      uglify: {
        files: 'countdown.js',
        tasks: ['uglify']
      },
      html: {
        files: '*.html'
      },
      options: {
        livereload: '<%= connect.options.livereload %>'
      }
    }

  };

  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jasmine:istanbul']);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('debug', ['connect']);
  //grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('jasmine-server', 'start web server for jasmine tests in browser', function() {
    grunt.task.run('jasmine::build');

    grunt.event.once('connect.test.listening', function(host, port) {
      var specRunnerUrl = 'http://' + host + ':' + port + '/_SpecRunner.html';
      grunt.log.writeln('Jasmine specs available at: ' + specRunnerUrl);
      require('open')(specRunnerUrl);
    });

    grunt.task.run('connect:test:keepalive');
  });

}
