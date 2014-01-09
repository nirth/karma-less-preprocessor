var less = require('less'),
    Parser = less.Parser,
    path = require('path'),
    fs = require('fs');

var createLessPreprocessor = function (args, config, basePath, logger, helper) {
  config = config || {};

  var options = config.options || {
    compress: false,
    save: false
  };

  var additionalData = config.additionalData || {};

  var log = logger.create('preprocessor:less');

  var transformPath = args.transformPath || config.transformPath || function (filePath) {
    return filePath.replace(/\.less$/, '.css');
  };

  var rendered = function (done, filePath, error, css) {
    if (error !== null && error !== undefined) {
      log.error('Error:%s\n', error);
    } else {
      content = css.toCSS({compress: options.compress})
      if (options.save) {
        var p = path.resolve(filePath.replace(/\/([\.a-zA-Z0-9\-\_]+).css$/, '/'));
        helper.mkdirIfNotExists(p, function () {
          var n = filePath.match(/[a-zA-Z\-\.\_]+.css$/).reverse()[0];
          fs.writeFile(path.join(p, n), content, 'utf-8', function (error) {
            if (error) {
              log.error("Error:%s", error);
            }
            done(content);
          });
        });
      } else {
        done(content);
      }
    }
  };

  return function (content, file, done) {
    file.path = transformPath(file.originalPath);

    if(options.paths) {
      for (importPath in options.paths) {
        options.paths[importPath] = basePath + '/' + options.paths[importPath];
      }
    }

    var parser = new Parser({
      paths: options.paths
    });

    try {
      parser.parse(content, rendered.bind(null, done, file.path), additionalData);
    } catch (error) {
      log.error('%s\n  at %s', error.message, file.originalPath);
      return;
    }
  };
};

createLessPreprocessor.$inject = ['args', 'config.lessPreprocessor', 'config.basePath', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:less': ['factory', createLessPreprocessor]
};
