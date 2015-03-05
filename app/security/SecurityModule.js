import loginModule from './login/LoginModule';
import createSimpleAccountModule from './create-simple-account/CreateSimpleAccountModule';
import SecurityUserResource from './resources/SecurityUserResource';

export default angular.module('zc.security', [
    loginModule.name,
    createSimpleAccountModule.name
])
.service('SecurityUserResource', SecurityUserResource)
;