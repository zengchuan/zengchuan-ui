import CreateSimpleAccountRoute from './CreateSimpleAccountRoute';
import CreateSimpleAccountController from './controllers/CreateSimpleAccountController';

export default angular.module('zc.security.create-simple-account', [])
    .config(CreateSimpleAccountRoute)
    .controller('CreateSimpleAccountController', CreateSimpleAccountController);