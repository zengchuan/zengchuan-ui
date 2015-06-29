class ZCLoginService {
    constructor($window) {
        'ngInject';
        this.$window = $window;
    }

    getSecurityUser() {
        return angular.fromJson(this.$window.sessionStorage.getItem('securityUser'));
    }

    getSecurityRole() {
        return angular.fromJson(this.$window.sessionStorage.getItem('securityRoleVO'));
    }

    getToken() {
        return this.$window.sessionStorage.getItem('zc-token');
    }

}

export default ZCLoginService;
