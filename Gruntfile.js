module.exports = function(grunt) {

  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: 'Countdown.js',
      options: {
        specs: 'tests/Countdown.js',
        keepRunner: true
      }
    },

    jshint: {
      all: [
        'Countdown.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      target: {
        files: {
          'Countdown.min.js': ['Countdown.js']
        }
      }
    },

    connect: {
      test: {
        options: {
          port: '8234',
          hostname:'localhost',
          keepalive: true
        }
      },
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      }
    },

    watch: {
      uglify: {
        files: 'Countdown.js',
        tasks: ['uglify']
      },
      html: {
        files: '*.html'
      }
    }

  };

  gruntConfig.jasmine.istanbul = {
    src: gruntConfig.jasmine.src,
    options: {
      specs: gruntConfig.jasmine.options.specs,
      template: require('grunt-template-jasmine-istanbul'),
      templateOptions: {
        coverage: 'output/coverage/coverage.json',
        report: [
          {type: 'html', options: {dir: 'output/coverage'}},
          {type: 'cobertura', options: {dir: 'output/coverage/cobertura'}},
          {type: 'text-summary'}
        ]
      }
    }
  };

  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jasmine:istanbul', 'jshint']);
  grunt.registerTask('deploy', ['uglify']);
  grunt.registerTask('jasmine-server', 'start web server for jasmine tests in browser', function() {
    grunt.task.run('jasmine::build');

    grunt.event.once('connect.test.listening', function(host, port) {
      var specRunnerUrl = 'http://' + host + ':' + port + '/_SpecRunner.html';
      grunt.log.writeln('Jasmine specs available at: ' + specRunnerUrl);
      require('open')(specRunnerUrl);
    });

    grunt.task.run('connect:test:keepalive');
  });

};
