'use strict';

import main from './views/main.html!text';
import welcome from './views/welcome.html!text';
import center from './views/center.html!text';
import test1 from './views/test1.html!text';
import test2 from './views/test2.html!text';

function MainRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state({
            name: 'main',
            url: '/main',
            controller: 'MainController as mainc',
            template: main,
            resolve: {
                languageId: ['ZCLanguageService', ZCLanguageService => ZCLanguageService.get()],
                securityUser: ['ZCLoginService', ZCLoginService => ZCLoginService.getSecurityUser()],
                loginInfoVO: ['SecurityUserResource', 'securityUser', 'languageId', function(SecurityUserResource, securityUser, languageId){
                    return SecurityUserResource.getLoginInfo(securityUser.userId, languageId);
                }]
            }
        })
       .state({
            name: 'main.center',
            url: '/center',
            template: center
        })
        .state({
            name: 'main.welcome',
            url: '/welcome',
            template: welcome
        })

        //.state({
        //    name: 'main.center.zc',
        //    url: '/zc',
        //    abstract: true,
        //    template: '<ui-view/>'
        //})
        .state({
            name: 'main.center.test1',
            url: '/test1',
            views: {
                'main.center.test1': {
                    controller: function($scope) {
                        $scope.test = 'Hello!';
                    },
                    template: test1
                }
            },
            deepStateRedirect: true,
            sticky: true
        })
        .state({
            name: 'main.center.test2',
            url: '/test2',
            views: {
                'main.center.test2': {
                    controller: function($scope) {
                        $scope.test = 'Hello!';
                    },
                    template: test2

                }
            },
            deepStateRedirect: true,
            sticky: true
        })
        ;
}

export default MainRoute;
