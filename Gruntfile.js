module.exports = function(grunt) {

  // Project configuration.
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
    }
  };

  gruntConfig.jasmine.istanbul= {
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
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jasmine:istanbul']);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('debug', ['connect']);

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
