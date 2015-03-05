'use strict';

import createSimpleAccount from './views/create-simple-account.html!text';

function SecurityRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('create-simple-account', {
            url: '/security/create-simple-account/:languageId',
            controller: 'CreateSimpleAccountController as csac',
            template: createSimpleAccount,
            //templateUrl: 'security/views/create-simple-account.html'
            resolve: {
                languageId: ['$stateParams', $stateParams => $stateParams.languageId],
                commGenderList: ['ZCCommDictResource', '$stateParams', function(ZCCommDictResource, $stateParams){
                    return ZCCommDictResource.getCommDictByLanguageId('CommGender', $stateParams.languageId);
                }]
            }
        })
        ;
}

export default SecurityRoute;
