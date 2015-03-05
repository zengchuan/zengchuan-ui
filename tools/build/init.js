module.exports = function (gulp, plugins, config, params) {
    var log = plugins.util.log;
//=============================================
//         COMMAND LINE ERROR HANDLING
//=============================================

    if(!params.ENV.match(new RegExp(/prod|dev|test/))) {
        log(params.COLORS.red('Error: The argument \'env\' has incorrect value \'' + ENV +'\'! Usage: gulp test:e2e --env=(prod|dev|test)'));
        return process.exit(1);
    }

    if(!params.BROWSERS.match(new RegExp(/PhantomJS|Chrome|Firefox|Safari/))) {
        log(params.COLORS.red('Error: The argument \'params.BROWSERS\' has incorrect value \'' + params.BROWSERS +'\'! Usage: gulp test:unit --params.BROWSERS=(PhantomJS|Chrome|Firefox|Safari)'));
        return process.exit(1);
    }

//=============================================
//            PRINT INFO MESSAGE
//=============================================
    log(params.COLORS.blue('********** RUNNING IN ' + params.ENV + ' ENVIROMENT **********'));

    plugins.help(gulp);
};

