import loginModule from './login/LoginModule';
import createSimpleAccountModule from './create-simple-account/CreateSimpleAccountModule';
import mainModule from './main/MainModule';
import SecurityUserResource from './resources/SecurityUserResource';

export default angular.module('zc.security', [
    loginModule.name,
    createSimpleAccountModule.name,
    mainModule.name
])
.service('SecurityUserResource', SecurityUserResource)
;