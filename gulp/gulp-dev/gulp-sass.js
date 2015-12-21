module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  /**
   * SASS | CSS
   * && writes sourcemap
   * && lints SASS file
   * && adds vendor prefixes for the previous two versions of Chrome
   * maxBuffer set to Infinity to avoid a gulp crash
   * Using Gulp-changed it only checks files that have changed
   */
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