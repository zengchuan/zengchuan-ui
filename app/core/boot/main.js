'use strict';

// vendor modules TODO: (martin) should I move 'vendor' to core module?
import './vendor';

import coreModule from '../CoreModule';
import commModule from '../../comm/CommModule';
import securityModule from '../../security/SecurityModule';
import publishModule from '../../publish/PublishModule';


let mainModule = angular.module('zcApp', [
    // angular modules
    'ngAnimate',
    'ngCookies',
    'ngSanitize',

    // 3rd party modules
    //'restangular',
    'ui.router',
    'ct.ui.router.extras',
    'ui.bootstrap',
    'ui.select',
    'ui.bootstrap',
    'ui.date',
    'ui.tinymce',
    'pascalprecht.translate',

    // modules
    coreModule.name,
    commModule.name,
    securityModule.name,
    publishModule.name


]);

export default mainModule;
