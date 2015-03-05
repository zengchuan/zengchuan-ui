'use strict';

import {ZC_CONST} from '../consts/ZCConst';

export function ZCConfig($locationProvider, $provide, $urlRouterProvider, RestangularProvider, $translateProvider, uiSelectConfig, uiDateConfig) {
    'ngInject';
    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    //$provide.decorator('$exceptionHandler', ['$delegate', 'ZCClientExceptionResource',  function ($delegate, zcClientExceptionResource) {
    //    return function(exception, cause) {
    //        zcClientExceptionResource.log(exception, cause);
    //    };
    //}]);

    // for any unmatched url, send to 404 page (Not page found)
    $urlRouterProvider.otherwise('/index');
    $urlRouterProvider.when('/', '/index');

    RestangularProvider.setBaseUrl(ZC_CONST.BASE_API_URL);

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.useLocalStorage();

    uiSelectConfig.theme = 'bootstrap';
    uiSelectConfig.resetSearchInput = true;

    uiDateConfig.changeMonth = true;
    uiDateConfig.changeYear = true;
    //uiDateConfig.regional = 'zh-CN';

}

export function ZCConfigOnRun($rootScope, $translate) {
    'ngInject';

    $rootScope.$on('$stateChangeStart',
        function(event, toState){
            console.debug(toState);
            let s = new Set();
            ZC_CONST.NOT_REQUIRED_AUTH.map(x => s.add(x));

            if(!s.has(toState.name)){
                event.preventDefault();
            }

        }
    );

    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh();
    });

    //$rootScope.$on('$translateChangeSuccess', function () {
    //    var language = $translate.uses();
    //    uiDateConfig.regional = ZCLanguageService.getLanguageForDate(language);
    //});
}




