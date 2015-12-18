/**
 * Created by andywalpole on 18/12/2015.
 */
// sudo npm install -g commitizen
  // sudo npm install -g conventional-changelog

var gulp = require('gulp');
var conventionalChangelog = require('gulp-conventional-changelog');

gulp.task('default', function() {
  return gulp.src('CHANGELOG.md', {
      buffer: false
    })
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});
