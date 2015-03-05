var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config, params) {
    /**
     * The 'watch' task set up the checks to see if any of the files listed below
     * change, and then to execute the listed tasks when they do.
     */
    gulp.task('watch', 'Watch files for changes', function () {
        // Watch images and fonts files
        gulp.watch([config.paths.app.images, config.paths.app.fonts], [browserSync.reload]);

        // Watch css files
        gulp.watch(config.paths.app.styles, ['scss']);

        // Watch js files
        gulp.watch([config.paths.app.scripts, config.paths.gulpfile], ['jshint', browserSync.reload]);

        // Watch html files
        gulp.watch([config.paths.app.htmlDev, config.paths.app.templates], ['htmlhint', 'copyIndex', browserSync.reload]);
    });
};


