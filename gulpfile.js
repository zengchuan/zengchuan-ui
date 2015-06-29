var build = require('./tools/build/build');
var bundle = require('./tools/build/bundle');
var clean = require('./tools/build/clean');
var compile = require('./tools/build/compile');
var copy = require('./tools/build/copy');
var e2e = require('./tools/build/e2e');
var hint = require('./tools/build/hint');
var init = require('./tools/build/init');
var scss = require('./tools/build/scss');
var unit = require('./tools/build/unit');
var serve = require('./tools/build/serve');
var watch = require('./tools/build/watch');

var runSequence = require('run-sequence');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('js-yaml').safeLoad(require('fs').readFileSync('./tools/build/config.yml', 'utf8'));
var argv = plugins.util.env;
var pkg = require('./package.json');

var params = {
    argv: argv,
    pkg: pkg,
    COLORS: plugins.util.colors,
    ENV: !!argv.env ? argv.env : 'dev',
    BROWSERS: !!argv.browsers ? argv.browsers : 'Chrome',
    CDN_BASE: !!argv.cdn ? config.urls.prodUrl : config.urls.devUrl,
    APPLICATION_BASE_URL: this.ENV ? config.urls.prodUrl : config.urls.devUrl
};


init(gulp, plugins, config, params);
clean(gulp, plugins, config, params);
copy(gulp, plugins, config, params);
e2e(gulp, plugins, config, params);
hint(gulp, plugins, config, params);
scss(gulp, plugins, config, params);
compile(gulp, plugins, config, params);
build(gulp, plugins, config, params);
bundle(gulp, plugins, config, params);
serve(gulp, plugins, config, params);
unit(gulp, plugins, config, params);
watch(gulp, plugins, config, params);

//gulp.task('default', 'Watch files and build environment', runSequence(['clean', 'serve.dev']));
gulp.task('default', 'Watch files and build environment', runSequence(['clean', 'serve.prod']));
//gulp.task('default', 'Watch files and build environment', runSequence(['clean', 'serve.dev', 'e2eTests']));
