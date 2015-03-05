'use strict';

/**
 * Stubbing of HTTP requests for backend-less frontend testing
 */
import 'angular-mocks';

function ZCConfigTest($provide) {
    'ngInject';
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
}

function ZCRunTest($httpBackend) {
    'ngInject';
    $httpBackend.whenGET(/^\w+.*/).passThrough();
    $httpBackend.whenPOST(/^\w+.*/).passThrough();
}

export default angular.module('zcApp.core.test', [])
    .config(ZCConfigTest)
    .run(ZCRunTest);
