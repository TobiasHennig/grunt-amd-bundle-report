/*
 * grunt-amd-bundle-report
 * https://github.com/henni11/grunt-amd-bundle-report
 *
 * Copyright (c) 2018 Tobias Hennig
 * Licensed under the MIT license.
 */

'use strict';
var Reporter = require('amd-bundle-report')

module.exports = function(grunt) {

  grunt.registerMultiTask('amd_bundle_report', 'The best Grunt plugin ever.', function() {
    var done = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      limit: null
    });

    Reporter.reportFiles(this.filesSrc, options).then(function(reports) {
      grunt.log.write(reports.message);
      done();
    }).catch(function(err) {
      grunt.log.error(err);
      done(false);
    });
  });

};
