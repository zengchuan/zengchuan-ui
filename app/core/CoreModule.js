import {ZCConfig, ZCConfigOnRun} from './configs/ZCConfig';
import {ZCContainer} from './directives/ZCContainer';
import {ZCHeight} from './directives/ZCHeight';
import {ZCFile} from './directives/ZCFile';
import {ZCSelectFilter} from './filters/ZCSelectFilter';
import {ZCIs, ZCCommonName} from './filters/ZCUtilFilter';
import ZCLanguageService from './services/ZCLanguageService';
import ZCModalService from './services/ZCModalService';
import ZCModalProgressService from './services/ZCModalProgressService';
import ZCCheckService from './services/ZCCheckService';
import ZCLoginService from './services/ZCLoginService';
import ZCHttpService from './services/ZCHttpService';
import ZCFileService from './services/ZCFileService';
//import ZCClientExceptionResource from './resources/ZCClientExceptionResource';
import ZCTemplatsModule from './templates/ZCTemplatesModule';

export default angular.module('zc.core', [ZCTemplatsModule.name])
    //.service('ZCClientExceptionResource', ZCClientExceptionResource)
    .service('ZCHttpService', ZCHttpService)
    .service('ZCLanguageService', ZCLanguageService)
    .service('ZCModalService', ZCModalService)
    .service('ZCModalProgressService', ZCModalProgressService)
    .service('ZCCheckService', ZCCheckService)
    .service('ZCLoginService', ZCLoginService)
    .service('ZCFileService', ZCFileService)
    .directive('zcContainer', ZCContainer)
    .directive('zcHeight', ZCHeight)
    .directive('zcFile', ZCFile)
    .filter('ZCSelectFilter', ZCSelectFilter)
    .filter('ZCIs', ZCIs)
    .filter('ZCCommonName', ZCCommonName)
    .config(ZCConfig)
    .run(ZCConfigOnRun);