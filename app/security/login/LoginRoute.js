'use strict';

import login from './views/login.html!text';

function SecurityRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('login', {
            url: '/index',
            controller: 'LoginController as loginc',
            template: login,
            //templateUrl: 'security/login/views/login.html',
            resolve: {
                languageId: ['ZCLanguageService', ZCLanguageService => ZCLanguageService.get()],
                commLanguageList: ['ZCCommLanguageResource', 'languageId', function(ZCCommLanguageResource, languageId){
                    return ZCCommLanguageResource.getCommLanguageById(languageId);
                }]
            }
        })
        ;
}

export default SecurityRoute;
