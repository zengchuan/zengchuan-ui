var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config, params) {
    gulp.task('scss', 'Compile scss files into the main.css', function () {
        // if it's set to `true` the gulp.watch will keep gulp from stopping
        // every time we mess up sass files
        var errLogToConsole = params.ENV === 'dev' || params.ENV === 'test';
        return gulp.src(config.paths.app.styles)
            .pipe(plugins.changed(config.paths.tmp.styles, {extension: '.scss'}))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({style: 'compressed', errLogToConsole: errLogToConsole}))
            .pipe(plugins.autoprefixer('last 2 version'))
            .pipe(plugins.concat('zc.css'))
            .pipe(plugins.sourcemaps.write('../maps'))
            .pipe(gulp.dest(config.paths.tmp.styles))
            .pipe(plugins.filter('**/*.css')) // Filtering stream to only css files
            .pipe(browserSync.reload({stream:true}));
    });
};


