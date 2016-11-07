var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function(){
	gulp.src('./Chpt1_mocha/test.js').pipe(mocha()).on('error', function(err){
		this.emit('end');
	});
});

gulp.task('watch', function(){
	gulp.watch('./Chpt1_mocha/*.js', ['test']);
});