
module.exports = function (gulp, plugins, config, params) {
    /**
     * The 'jshint' task defines the rules of our hinter as well as which files
     * we should check. It helps to detect errors and potential problems in our
     * JavaScript code.
     */
    gulp.task('jshint', 'Hint JavaScripts files', function () {
        return gulp.src(config.paths.app.scripts.concat(config.paths.gulpfile))
            .pipe(plugins.jshint('./tools/build/.jshintrc'))
            .pipe(plugins.jshint.reporter('jshint-stylish'))
            .pipe(plugins.jshint.reporter('fail'));
    });

    /**
     * The 'htmlhint' task defines the rules of our hinter as well as which files we
     * should check. It helps to detect errors and potential problems in our
     * HTML code.
     */
    gulp.task('htmlhint', 'Hint HTML files', function () {
        return gulp.src([config.paths.app.htmlDev, config.paths.app.templates])
            .pipe(plugins.htmlhint('./tools/build/.htmlhintrc'))
            .pipe(plugins.htmlhint.reporter())
            .pipe(plugins.htmlhint.failReporter());
    });

    /**
     * The 'fonts' task copies fonts to `build/dist` directory.
     */
    gulp.task('fonts', 'Copy fonts to `build/dist` directory', function () {
        return gulp.src(config.paths.app.fonts)
            .pipe(plugins.filter('**/*.{eot,svg,ttf,woff}'))
            .pipe(plugins.flatten())
            .pipe(gulp.dest(config.paths.build.dist.fonts))
            .pipe(plugins.size({title: 'fonts'}));
    });

    /**
     * The 'images' task minifies and copies images to `build/dist` directory.
     */
    gulp.task('images', 'Minifies and copies images to `build/dist` directory', function () {
        return gulp.src(config.paths.app.images)
            .pipe(plugins.imagemin({
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest(config.paths.build.dist.basePath))
            .pipe(plugins.size({title: 'images'}))
            ;
    });

    gulp.task('i18n', 'Copy i18n', function () {
        return gulp.src([config.paths.app.i18n])
            .pipe(plugins.jsonmin())
            .pipe(gulp.dest(config.paths.build.dist.basePath));
    });
};

