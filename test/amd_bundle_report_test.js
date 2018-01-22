'use strict';

var grunt = require('grunt');
var path = require('path');
var Reporter = require('amd-bundle-report');
var stripAnsi = require('strip-ansi');

var fixtures = path.join(__dirname, 'fixtures');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.amd_bundle_report = {
  setUp: function(done) {
    this.files = [path.join(fixtures, 'bundle.js'), path.join(fixtures, 'anotherBundle.js'), path.join(fixtures, 'yetAnotherBundle.js')];
    done();
  },
  default: function(test) {
    var expected = grunt.file.read('test/expected/default_options');
    test.expect(1);

    Reporter.reportFiles(this.files, {limit: 90}).then(function(reports) {
      return stripAnsi(reports.message);
    }).then(function(actual) {
      test.equal(actual, expected, 'should describe what the default behavior is.');
      test.done();
    }).catch(function(err){
      console.error(err);
      test.done();
    });
  },
};
