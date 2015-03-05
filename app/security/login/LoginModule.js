import LoginRoute from './LoginRoute';
import LoginController from './controllers/LoginController';

export default angular.module('zc.security.login', [])
    .config(LoginRoute)
    .controller('LoginController', LoginController)
    ;