module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src(filePaths.sassInput + '*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.scssLint({
        'maxBuffer': Infinity
      }))
      .pipe(plugins.sass({outputStyle: 'expanded'}).on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 Chrome versions'],
        cascade: false,
      }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(filePaths.sassOut));
  };
};