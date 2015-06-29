import ZCModalController from './controllers/ZCModalController';
import ZCModalCommonController from './controllers/ZCModalCommonController';
import ZCModalProgressController from './controllers/ZCModalProgressController';

export default angular.module('zc.security.zc-templates', [])
    .controller('ZCModalController', ZCModalController)
    .controller('ZCModalCommonController', ZCModalCommonController)
    .controller('ZCModalProgressController', ZCModalProgressController)
    ;
