module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src('src/assets/styles/_reset.scss')
      .pipe(plugins.scssLint({
        'maxBuffer': 307200
      }));
  };
};