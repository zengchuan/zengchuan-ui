var gProtractor = require('gulp-protractor');

module.exports = function(gulp, plugins, config, params) {
    gulp.task('e2eTests', 'e2e test', function () {
        return gulp.src([config.paths.test.e2e])
            .pipe(gProtractor.protractor({
                configFile: config.paths.test.protractor
            })).on('error', function (e) {
                console.log("e2e error----------------------");
                console.log(e);
                return process.exit(1);
            }).on('end', function () {
                console.log("e2e end--------------------");
                return process.exit(1);
            });
    });
}
