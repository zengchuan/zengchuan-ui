'use strict';

import mainModule from './main';
import testModule from '../configs/ZCConfig.test';
import commModuleMock from '../../comm/CommModule.mock';
import securityModuleMock from '../../security/SecurityModule.mock';


let mainModuleTest = angular.module('zcAppTest', [
    // modules
    mainModule.name,
    testModule.name,

    commModuleMock.name,
    securityModuleMock.name

]);

export default mainModuleTest;
