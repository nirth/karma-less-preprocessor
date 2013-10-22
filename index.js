var less = require('less'),
    Parser = less.Parser,
    path = require('path');

var createLessPreprocessor = function (args, config, logger, helper) {
  config = config || {};
  var options = config.options || {
    compress: false
  };

  var log = logger.create('preprocessor:less');

  var transformPath = args.transformPath || config.transformPath || function (filePath) {
    return filePath.replace(/\.less$/, '.css');
  };

  var rendered = function (done, error, css) {
    if (error !== null && error !== undefined) {
      log.error('Error:%s\n', error);
    } else {
      done(css.toCSS({compress: options.compress}));
    }
  };

  return function (content, file, done) {
    file.path = transformPath(file.originalPath);

    var parser = new Parser({
      paths: options.paths
    });

    try {
      parser.parse(content, rendered.bind(null, done));
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
