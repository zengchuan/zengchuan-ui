import {ZCConfig, ZCConfigOnRun} from './configs/ZCConfig';
import {ZCContainer} from './directives/ZCContainer';
import {ZCSelectFilter} from './filters/ZCSelectFilter';
import {ZCUnsafeFilter} from './filters/ZCUnsafeFilter';
import ZCLanguageService from './services/ZCLanguageService';
import ZCModalService from './services/ZCModalService';
import ZCCheckService from './services/ZCCheckService';
//import ZCClientExceptionResource from './resources/ZCClientExceptionResource';
import ZCTemplatsModule from './templates/ZCTemplatesModule';

export default angular.module('zc.core', [ZCTemplatsModule.name])
    //.service('ZCClientExceptionResource', ZCClientExceptionResource)
    .service('ZCLanguageService', ZCLanguageService)
    .service('ZCModalService', ZCModalService)
    .service('ZCCheckService', ZCCheckService)
    .directive('zcContainer', ZCContainer)
    .filter('ZCSelectFilter', ZCSelectFilter)
    .filter('ZCUnsafeFilter', ZCUnsafeFilter)
    .config(ZCConfig)
    .run(ZCConfigOnRun);