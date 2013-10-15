(function (less, path, module) {
  'use strict';
  // Module

  var createLessPreprocessor = function (args, config, logger, helper) {
    config = config || {};

    var log = logger.create('preprocessor:less');
    log.info("Processing LESS files");

    var transformPath = args.transformPath || config.transformPath || function (filePath) {
      return filePath.replace(/\.less$/, '.css');
    };

    var rendered = function (done, error, css) {
      if (error !== null && error !== undefined) {
        log.error('%s\n', error);
      } else {
        log.info("Processed");
        done(css);
      }
    };

    return function (content, file, done) {
      log.info("lessPreprocessor");
      log.info('Processing "%s".', file.originalPath);
      file.path = transformPath(file.originalPath);

      try {
        less.render(content, rendered.bind(null, done));
      } catch (error) {
        log.error('%s\n  at %s', error.message, file.originalPath);
        return;
      }
    };
  };

  createLessPreprocessor.$inject = ['args', 'config.lessPreprocessor', 'logger', 'helper'];

  // PUBLISH DI MODULE
  module.exports = {
    'preprocessor:less': ['factory', createLessPreprocessor]
  };
})(
  require('less'),
  require('path'),
  module
);