
module.exports = function(gulp, plugins, config, params) {
    /**
     * Create JS production bundle.
     */
    gulp.task('bundle', 'Create JS production bundle', ['jshint'], function (cb) {
        var builder = require('systemjs-builder');

        builder.loadConfig('jspm.conf.js')
            .then(function() {
                builder.buildSFX('app/core/boot/bootstrap', config.paths.tmp.scripts + 'build.js', { sourceMaps: true, config: {sourceRoot: config.paths.tmp.scripts} })
                    .then(function() {
                        return cb();
                    })
                    .catch(function(ex) {
                        cb(new Error(ex));
                    });
            });
    });
};


