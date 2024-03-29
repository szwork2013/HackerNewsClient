var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    copy = require('gulp-copy'),
    shell = require('gulp-shell'),
    del = require('del'),
    webpack = require('webpack'),
    argv = require('optimist').argv,
    webpackConfig = require('./webpack.config.js');

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('css', ['clean'], function () {
    return gulp.src(['dev/css/pure.css', 'dev/css/index.css'])
        .pipe(concat('index.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', ['clean'], function () {
    return gulp.src('dev/img/**')
        .pipe(copy('dist', {prefix: 1}));
});

gulp.task('html', ['clean'], function () {
    gulp.src(['dev/*.jade'])
        .pipe(jade({
            locals: {
                production: argv.e = 'production',
                version: Date.now()
            },
            pretty: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("webpack", ['clean'], function (callback) {
    if (!Object.prototype.toString.call(webpackConfig) === '[object Array]') {
        webpackConfig = [webpackConfig];
    }

    webpackConfig.forEach(function (currentValue, i, array) {
        array[i].bail = true;
        array[i].plugins = [
            new webpack.optimize.UglifyJsPlugin()
        ];
    });

    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

gulp.task('default', ['build']);
gulp.task('build', ['css', 'webpack', 'img', 'html']);
gulp.task('server', shell.task([
    'node bin/app'
]));