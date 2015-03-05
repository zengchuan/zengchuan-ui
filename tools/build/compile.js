var moment = require('moment');

module.exports = function (gulp, plugins, config, params) {

    var formatPercent = function(num, precision){
        return (num*100).toFixed(precision);
    }

    var bytediffFormatter = function (data) {
        var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
        return params.COLORS.yellow(data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1-data.percent, 2) + '%' + difference);
    }

    var banner = function(pkgs){
        return plugins.util.template(
            '/**\n' +
            ' * <%= pkg.description %>\n' +
            ' * @version v<%= pkg.version %> - <%= today %>\n' +
            ' * @author <%= pkg.author.name %>\n' +
            ' * @copyright <%= year %>(c) <%= pkg.author.name %>\n' +
            ' * @license <%= pkg.license.type %>, <%= pkg.license.url %>\n' +
            ' */\n', {file: '', pkg: pkgs, today: moment(new Date()).format('D/MM/YYYY'), year: new Date().toISOString().substr(0, 4)});
    }

    /**
     * The 'compile' task compile all js, css and html files.
     *
     * 1. it compiles and minify html templates to js template cache
     * 2. css      - replace local path with CDN url, minify, add revision number, add banner header
     *    css_libs - minify, add revision number
     *    js       - annotates the sources before minifying, minify, add revision number, add banner header
     *    js_libs  - minify, add revision number
     *    html     - replace local path with CDN url, minify
     */
    gulp.task('compile', 'Does the same as \'jshint\', \'htmlhint\', \'images\', \'templates\' tasks but also compile all JS, CSS and HTML files',
        ['htmlhint', 'scss', 'bundle'], function () {
            var projectHeader = plugins.header(banner(params.pkg));

            return gulp.src(config.paths.app.htmlDev)
                .pipe(plugins.inject(gulp.src(config.paths.tmp.scripts + 'build.js', {read: false}), {
                    starttag: '<!-- inject:build:js -->',
                    ignorePath: [config.paths.app.basePath]
                }))
                .pipe(plugins.usemin({
                    css:        [
                        plugins.if(!!params.argv.cdn, plugins.cdnizer({defaultCDNBase: params.CDN_BASE, relativeRoot: '/', files: ['**/*.{gif,png,jpg,jpeg}']})),
                        plugins.bytediff.start(),
                        plugins.minifyCss({keepSpecialComments:0}),
                        plugins.bytediff.stop(bytediffFormatter),
                        plugins.rev(),
                        projectHeader
                    ],
                    js:         [
                        plugins.if(!!params.argv.cdn, plugins.cdnizer({defaultCDNBase: params.CDN_BASE, relativeRoot: '/', files: ['**/*.{gif,png,jpg,jpeg}']})),
                        plugins.bytediff.start(),
                        plugins.ngAnnotate({add: true, single_quotes: true, stats: true}),
                        plugins.uglify(),
                        plugins.bytediff.stop(bytediffFormatter),
                        plugins.rev(),
                        projectHeader
                    ],
                    html:       [
                        plugins.if(!!params.argv.cdn, plugins.cdnizer({defaultCDNBase: params.CDN_BASE, files: ['**/*.{js,css}']})),
                        plugins.bytediff.start(),
                        plugins.minifyHtml({empty:true}),
                        plugins.bytediff.stop(bytediffFormatter),
                        plugins.rename('index.html')
                    ]
                }))
                .pipe(gulp.dest(config.paths.build.dist.basePath))
                .pipe(plugins.size({title: 'compile', showFiles: true}));
        });

};




