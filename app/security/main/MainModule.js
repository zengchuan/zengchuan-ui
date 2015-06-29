import MainRoute from './MainRoute';
import MainController from './controllers/MainController';
import ContentController from './controllers/ContentController';

export default angular.module('zc.security.main', [])
    .config(MainRoute)
    .controller('MainController', MainController)
    .controller('ContentController', ContentController)
    ;