var browserSync = require('browser-sync');
var httpProxy = require('http-proxy');
var modRewrite     = require('connect-modrewrite');

var proxyTarget = 'http://localhost:9080/zc'; // The location of your backend
var proxyApiPrefix = 'zc-api'; // The element in the URL which differentiate between API request and static file request

var proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

var proxyMiddleware = function (req, res, next) {
    if (req.url.indexOf(proxyApiPrefix) !== -1) {
        proxy.web(req, res);
    } else {
        next();
    }
};

var startBrowserSync = function (baseDir, middleware, files, browser) {

    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;
    middleware = middleware === undefined ? function (req, res, next) {next();} : middleware;

    browserSync({
        files: files,
        port: 9090,
        notify: false,
        server: {
            baseDir: baseDir,
            middleware: [
                middleware,
                modRewrite(['!\\.\\w+$ /index.html [L]', '!\\.\\w+$ /index.test.html [L]']) // require for HTML5 mode
            ]
        },
        browser: browser
    });

};

module.exports = function (gulp, plugins, config, params) {
    /**
     * The 'serve.dev' task serve the dev environment.
     */
    gulp.task('serve.dev', 'Serve for the dev environment', ['scss', 'copyIndex', 'watch'], function() {
        //startBrowserSync(['.tmp', 'app', 'jspm_packages', './' ]);
        startBrowserSync(['.tmp', 'app', 'jspm_packages', './' ], proxyMiddleware);
        //startBrowserSync(['.tmp', 'app', 'jspm_packages', './' ]);
    });

    /**
     * The 'serve.prod' task serve the prod environment.
     */
    gulp.task('serve.prod', 'Serve the prod environment', ['build'], function() {
        startBrowserSync([config.paths.build.dist.basePath], proxyMiddleware);
    });
};




