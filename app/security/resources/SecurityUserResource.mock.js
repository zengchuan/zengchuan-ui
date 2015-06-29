'use strict';

import securityUserLogin from './fixtures/SecurityUser-login.json!json';
import securityUserLoginInfo from './fixtures/SecurityUser-login-info.json!json';
import securityUserLoginInfoRole from './fixtures/SecurityUser-login-info-role.json!json';

function SecurityUserResourceMock($httpBackend) {
    'ngInject';

    $httpBackend.whenPOST(/\/security-user\/simple-account/)
        .respond( () => {
            return [200, {}];
        });


    $httpBackend.whenPOST(/\/security-user\/login/)
        .respond( () => {
            return [200, securityUserLogin];
        });

    $httpBackend.whenGET(/\/security-user\/login-info/)
        .respond( () => {
            return [200, securityUserLoginInfo];
        });

    $httpBackend.whenGET(/\/security-user\/login-info-role/)
        .respond( () => {
            return [200, securityUserLoginInfoRole];
        });



}

export default SecurityUserResourceMock;


