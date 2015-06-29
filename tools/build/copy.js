
module.exports = function(gulp, plugins, config, params) {
    gulp.task('copy', 'Copy project files that haven\'t been copied by \'compile\' task into the \'build/dist\' directory', function (cb) {
        cb();
    });

    gulp.task('copyIndex', 'Copy index.test.html into the \'.tmp\' directory', function () {
        return gulp.src(config.paths.app.htmlDev)
        //return gulp.src(config.paths.app.htmlProd)
            .pipe(plugins.rename('index.html'))
            .pipe(gulp.dest(config.paths.tmp.basePath));
    });
}
