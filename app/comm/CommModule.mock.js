import CommModule from './CommModule';
import ZCCommLanguageResourceMock from './resources/ZCCommLanguageResource.mock';
import ZCCommDictResourceMock from './resources/ZCCommDictResource.mock';

export default angular.module('zc.comm.mock', [CommModule.name])
    .run(ZCCommLanguageResourceMock)
    .run(ZCCommDictResourceMock)
    ;