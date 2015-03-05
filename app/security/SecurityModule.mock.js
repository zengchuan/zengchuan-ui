import SecurityModule from './SecurityModule';
import SecurityUserResourceMock from './resources/SecurityUserResource.mock';

export default angular.module('zc.security.mock', [SecurityModule.name])
    .run(SecurityUserResourceMock)
    ;