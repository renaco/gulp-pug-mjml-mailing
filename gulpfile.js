let gulp = require('gulp');
let browserSync = require('browser-sync');
let htmlmin = require('gulp-htmlmin');
let mjml = require('gulp-mjml');
let pug = require('gulp-pug');
let rename = require('gulp-rename');

gulp.task('build', function () {
  gulp.src('./source/views/templates/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename({
      extname: '.mjml'
    }))
    .pipe(mjml())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./build'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    startPath: ''
  });
});

gulp.task('watch', function () {
  gulp.watch('./source/views/templates/**/*.pug', ['build']).on('change', browserSync.reload);
});

gulp.task('default', ['build', 'watch', 'browser-sync']);
