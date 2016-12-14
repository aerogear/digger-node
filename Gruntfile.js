/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      src: ['lib/**/*.js', 'bin/*.js'],
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false,
          noFail: false
        },
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task.
  grunt.registerTask('default', ['eslint','mochaTest']);
  grunt.registerTask('test', ['eslint','mochaTest']);
};
