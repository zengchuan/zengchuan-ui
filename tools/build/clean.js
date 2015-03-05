var del = require('del');
var util = require('./util');

module.exports = function (gulp, plugins, config, params) {
    var log = plugins.util.log;

    gulp.task('clean', 'Delete \'build\' and \'.tmp\' directories', function (cb) {
        var files = [].concat(config.paths.build.basePath, config.paths.tmp.basePath);
        log('Cleaning: ' + params.COLORS.blue(files));

        return del(files, cb);
    });
};

