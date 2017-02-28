var gulp = require('gulp');

var browserSync = require('browser-sync');
var inlinesource = require('gulp-inline-source')
var htmlmin = require('gulp-htmlmin');
var mjml = require('gulp-mjml');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var util = require('gulp-util');

gulp.task('email', function() {
    gulp.src('./source/views/templates/**/*.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(rename({
            extname: '.mjml'
        }))
        .pipe(mjml())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
		startPath: ''
  });
});

gulp.task('watch', function(){
    gulp.watch('./source/views/templates/**/*.pug', ['email']).on('change', browserSync.reload);
});

gulp.task('default', ['email', 'watch', 'browser-sync']);
