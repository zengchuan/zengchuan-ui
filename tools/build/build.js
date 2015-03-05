var util = require('./util');
var runSequence = require('run-sequence');

module.exports = function (gulp, plugins, config, params) {

    /**
     * The 'build' task gets app ready for deployment by processing files
     * and put them into directory ready for production.
     */
    gulp.task('build', 'Build application for deployment', function (cb) {
        runSequence(
            ['clean'],
            ['compile', 'images', 'fonts', 'i18n'],
            cb
        );
    }, {
        options: {
            'env=<environment>': 'environment flag (prod|dev|test)',
            'cdn': 'replace local path with CDN url'
        }
    });

};




