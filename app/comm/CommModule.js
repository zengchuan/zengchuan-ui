import ZCCommLanguageResource from './resources/ZCCommLanguageResource';
import ZCCommDictResource from './resources/ZCCommDictResource';

export default angular.module('zc.comm', [])
    .service('ZCCommLanguageResource', ZCCommLanguageResource)
    .service('ZCCommDictResource', ZCCommDictResource)
    ;