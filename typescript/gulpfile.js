var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var log = require('fancy-log');

gulp.task('test-roman-numerals-encoder', function () {
    return browserify({
        basedir: './RomanNumeralsEncoder',
        debug: false,
        entries: ['test.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('test-roman-numerals-encoder.js'))
        .pipe(gulp.dest('test'));
});

gulp.task('build-roman-numerals-encoder', function () {
    return browserify({
        basedir: './RomanNumeralsEncoder',
        debug: false,
        entries: ['Main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('solution-roman-numerals-encoder.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('test-roman-numerals-decoder', function () {
    return browserify({
        basedir: './RomanNumeralsDecoder',
        debug: false,
        entries: ['test.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('test-roman-numerals-decoder.js'))
        .pipe(gulp.dest('test'));
});

gulp.task('roman-numerals-encoder', gulp.series('build-roman-numerals-encoder', 'test-roman-numerals-encoder'));

gulp.task('test', gulp.parallel('test-roman-numerals-encoder', 'test-roman-numerals-decoder'));

gulp.task('default', function () {
    log("Not implemented yet");
    return Promise.resolve();
});