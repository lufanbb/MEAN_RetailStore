var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
	return gulp.
		src('./Angular/index.js').
		pipe(browserify()).
		pipe(gulp.dest('./Angular/bin'));
});

gulp.task('watch', function() {
	gulp.watch(['./Angular/*.js'], ['browserify']);
});