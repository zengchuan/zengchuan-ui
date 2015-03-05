'use strict';


function SecurityUserResourceMock($httpBackend) {
    'ngInject';
    $httpBackend.whenPOST(/\/security-user\/simple-account/)
        .respond( () => {
            return [200, {}];
        });




}

export default SecurityUserResourceMock;


