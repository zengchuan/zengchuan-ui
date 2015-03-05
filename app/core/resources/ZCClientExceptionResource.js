class ZCClientExceptionResource {
    constructor($log, $window) {
        'ngInject';
        this.$log = $log;
        this.$window = $window;
    }

    log(exception, cause) {
        var data = angular.toJson({
            errorUrl: this.$window.location.href,
            errorMessage: exception.toString(),
            stackTrace: '',
            cause: ( cause || '' )
        });
        this.$log.log(data);
        //this.Restangular.all('comm-client-exception').post('data', data).then(function() {
        //    this.$log.log('ZCClientExceptionService saved OK!');
        //}, function() {
        //    this.$log.log('ZCClientExceptionService saved wrong!');
        //});
    }
}

export default ZCClientExceptionResource;
