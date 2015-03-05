'use strict';

// vendor modules TODO: (martin) should I move 'vendor' to core module?
import './vendor';

import coreModule from '../CoreModule';
import commModule from '../../comm/CommModule';
import securityModule from '../../security/SecurityModule';


let mainModule = angular.module('zcApp', [
    // angular modules
    'ngAnimate',
    'ngCookies',
    'ngSanitize',

    // 3rd party modules
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'ui.bootstrap',
    'ui.date',
    'pascalprecht.translate',

    // modules
    coreModule.name,
    commModule.name,
    securityModule.name


]);

export default mainModule;
