'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const htmlmin = require('gulp-htmlmin');
const mjml = require('gulp-mjml');
const pug = require('gulp-pug');
const rename = require('gulp-rename');

// Configs
let inputPath = './source/views/**/*.pug';
let tempPath = './temp';
let outputPath = './build';

gulp.task('build', () => {
  return gulp.src(inputPath)
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename({
      extname: '.mjml'
    }))
    .pipe(gulp.dest(tempPath))
    .pipe(mjml())
    .pipe(gulp.dest(outputPath))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
  });

gulp.task('mjml', () => {
  return gulp.src(tempPath)
    .pipe(mjml())
    .pipe(gulp.dest(outputPath))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
})

gulp.task('browser-sync', (cb) => {
  browserSync({
    server: {
      baseDir: outputPath
    },
    port: 4000
  }, cb);
});

gulp.task('watch', () => {
  return gulp.watch(inputPath, gulp.series(
    'build'
  ));
});

gulp.task('default', gulp.series(
  'build',
  'browser-sync',
  'watch'
));
